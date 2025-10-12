import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = await auth();
    
    if (!isAuthenticated) redirect("/sign-in");

    return (
        <main className="min-h-screen">
            {children}
        </main>
    );
};

export default AppLayout;