import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { WorkspaceAppSidebar } from "./workspace/_components/WorkspaceAppSideBar";
import WorkspaceAppHeader from "./workspace/_components/WorkspaceAppHeader";
import UserProvider from "@/providers/userProvider";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = await auth();

    if (!isAuthenticated) redirect("/sign-in");

    return (
        <UserProvider>
            <SidebarProvider>
                <WorkspaceAppSidebar />
                <main className="min-h-screen w-full">
                    <WorkspaceAppHeader />
                    {children}
                </main>
            </SidebarProvider>
        </UserProvider>
    );
};

export default AppLayout;