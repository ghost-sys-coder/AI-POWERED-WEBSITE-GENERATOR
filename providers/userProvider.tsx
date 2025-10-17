"use client";

import React, {
    ReactNode, useCallback, useEffect,
    useContext, createContext,
    useState
} from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from '@clerk/nextjs';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import TypeWriterEffect from '@/components/shared/TypeWriterEffect';

const loaderText = "Loading...";

/**
 * !! Define the User Context Type
 */
interface UserContextType {
    userDetails: {
        id?: string;
        name?: string;
        email?: string;
        credits?: number;
    } | null;

    loading?: boolean;

    refreshUser?: () => Promise<void>;
}

/**
 * !! Create Context
 */
const UserContext = createContext<UserContextType>({
    userDetails: null,
    loading: true,
    refreshUser: async () => { },
});

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === null) {
        throw new Error("useUserContext must be used within User Provider")
    };

    return context;
}

/**
 * !! Provider Component
 */

const UserProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const { isLoaded, isSignedIn, session } = useSession();
    const [userDetails, setUserDetails] = useState<UserContextType["userDetails"]>(null);
    const [loading, setLoading] = useState(true);

    // Redirect to sign-in if not authenticated
    useEffect(() => {
        if (isLoaded && !isSignedIn && !session) {
            router.push("/sign-in");
        }
    }, [isLoaded, router, isSignedIn, session]);

    // check if user exists in the database, if not create one
    const createUserIfNotExists = useCallback(async () => {
        if (!session) return;

        try {
            setLoading(true);
            const user = session?.user;

            // localstorage flag runs once per session 
            const sessionFlag = `user_synced_${user.id}_${session.id}`;

            const response = await axios.post("/api/auth",
                {
                    clerkUser: user.id,
                    name: user?.fullName || "Unnamed User",
                    email: user?.emailAddresses[0]?.emailAddress
                }
            );

            setUserDetails(response?.data?.data || null);

            if (response.status === 201) {
                toast.success("User profile Saved!");
            }

            if (response.status === 200) {
                if (localStorage.getItem(sessionFlag)) return;
                toast.success(response.data.message || "Welcome back")
            }

            // set session flag
            localStorage.setItem(sessionFlag, "true");
        } catch (error) {
            console.error("Error creating user:", error);
        } finally {
            setLoading(false);
        }
    }, [session]);


    // Refresh user manually if needed
    const refreshUser = useCallback(async () => {
        if (!session) return;
        setLoading(true);

        try {
            const response = await axios.post("/api/auth", {
                clerkUser: session.user.id
            });
            setUserDetails(response.data?.data || null);
        } catch (error) {
            console.error("Error refreshing user:", error);
        } finally {
            setLoading(false);
        }
    }, [session]);

    useEffect(() => {
        if (isLoaded && isSignedIn && session) {
            createUserIfNotExists();
        }
    }, [isLoaded, isSignedIn, session, createUserIfNotExists]);

    if (!isLoaded) {
        return (
            <div className="flex flex-col gap-4 items-center justify-center h-screen bg-gray-50">
                <Loader2
                    className="animate-spin h-12 w-12 text-primary"
                    aria-hidden="true"
                />
                <TypeWriterEffect
                    text={loaderText}
                    delay={300}
                    infinite={true}
                />
                <span className="sr-only">Loading application</span>
            </div>
        );
    }

    if (!session) return null;

    return (
        <UserContext.Provider value={{ userDetails, loading, refreshUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider