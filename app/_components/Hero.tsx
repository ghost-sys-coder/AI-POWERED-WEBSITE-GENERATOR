"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { v4 as uuidv4 } from 'uuid';
import { HomeIcon, ImagePlusIcon, Key, LayoutDashboard, Send, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, generateFourRandomNumbers } from '@/lib/utils';
import axios from 'axios';
import { toast } from 'sonner';
import TypeWriterEffect from '@/components/shared/TypeWriterEffect';


const suggestions = [
    {
        label: "Dashboard",
        prompt: "Create an analytics dashboard to track customers & revenu data for a Saas",
        icon: LayoutDashboard
    },
    {
        label: "Signup Form",
        prompt: "Create a modern signup form with email/password fields, Google and Github login options and a terms checkbox",
        icon: Key
    },
    {
        label: "Hero",
        prompt: "Create a modern header and Centered hero section for a productivity Saas application. Include a badge for feature annoucements, a title with subtle gradient effect",
        icon: HomeIcon
    },
    {
        label: "User Profile Card",
        prompt: "Create a modern user card component for a social media website",
        icon: User
    }
]

const Hero = ({ styling }: { styling?: string }) => {
    const router = useRouter();
    const [userInput, setUserInput] = useState<string | "">("");
    const [isCreating, setIsCreating] = useState(false);

    const handleSuggestion = (value: string) => {
        setUserInput(value);
    }

    const createNewProject = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userInput.trim()) {
            toast.error("Please provide a design prompt");
            return;
        }

        setIsCreating(true);
        try {
            const projectId = uuidv4();
            const frameId = generateFourRandomNumbers();

            const { status, data } = await axios.post("/api/projects", {
                projectId,
                frameId,
                chatMessage: [{ role: "user", content: userInput }]
            });
            if (status === 201 && data?.success) {
                toast.success("Project created successfully! Redirecting...");
            } else {
                toast.error(data?.message || "Failed to create project");
                return;
            }
            // navigate to the project page -- playground
            router.push(`/playgroud/${data?.result?.projectId}?frameId=${data?.result?.frameId}`);
        } catch (error) {
            console.log("Error creating project: ", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsCreating(false);
        }
    }

    return (
        <div className={cn("h-[80vh] flex flex-col justify-center items-center gap-3 p-5 z-10 relative", styling)}>
            <div className="">
                <h2 className="font-bold text-6xl">What should we build today?</h2>
                <p className="text-2xl mt-2 text-gray-500">Let&apos;s create something amazing with Next.js!</p>
                <p className="text-xl mt-2 text-gray-500">Generate, edit and explore designs with AI. Export your code!</p>
            </div>

            <div className="w-full max-w-xl p-5 rounded-xl border mt-5 relative">
                {isCreating ? (
                    <TypeWriterEffect
                        text='Creating....'
                        textSize='text-2xl md:text-4xl'
                    />
                ) : (
                    <form className='flex flex-col gap-3' onSubmit={createNewProject}>
                        <textarea
                            placeholder='Describe your page design'
                            className='h-24 w-full focus:outline-none focus:ring-0 focus:resize-none'
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                        <div className="flex w-full justify-between items-center gap-3">
                            <Button variant={"ghost"} className='cursor-pointer' type="button">
                                <ImagePlusIcon />
                            </Button>
                            <SignedIn>
                                <Button disabled={!userInput}
                                    className='cursor-pointer'
                                    type='submit'
                                >
                                    <Send size={10} />
                                </Button>
                            </SignedIn>
                            <SignedOut>
                                <SignInButton>
                                    <Button disabled={!userInput} className='cursor-pointer'>
                                        <Send size={10} />
                                    </Button>
                                </SignInButton>
                            </SignedOut>
                        </div>
                    </form>
                )}
            </div>

            <div className="flex gap-4 flex-wrap">
                {suggestions.map((suggestion, index) => (
                    <Button variant={"ghost"} key={index}
                        className='cursor-pointer border'
                        onClick={() => handleSuggestion(suggestion.prompt)}
                    >
                        <suggestion.icon />
                        <span>{suggestion.label}</span>
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default Hero