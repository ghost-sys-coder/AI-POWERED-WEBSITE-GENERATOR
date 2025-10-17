"use client";
import React, { useState } from "react"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { useUserContext } from "@/providers/userProvider";
import { Progress } from "@/components/ui/progress";
import { UserButton } from "@clerk/nextjs";

export function WorkspaceAppSidebar() {
    const { userDetails } = useUserContext();
    const [projectList, setProjectList] = useState([]);

    return (
        <Sidebar>
            <SidebarHeader className="p-4 z-50 sticky top-0 bg-background/90 backdrop-blur-sm border-b">
                <div className="flex items-center gap-2">
                    <Image
                        src={"/images/auth_image.svg"}
                        alt="logo"
                        width={35} height={35}
                    />
                    <h2 className="font-medium text-xl">AstraPages</h2>
                </div>
                <Button asChild>
                    <Link href={"/workspace"}>
                        <Plus />
                        <span>Add New Project</span>
                    </Link>
                </Button>
            </SidebarHeader>
            <SidebarContent className="p-4">
                <SidebarGroup>
                    <SidebarGroupLabel>Projects</SidebarGroupLabel>
                    {projectList.length === 0 && (
                        <h2 className="text-sm text-gray-500">No Projects Found!</h2>
                    )}
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="bg-secondary border rounded-xl p-2 space-y-3">
                    <h2 className="flex gap-1 justify-between items-center text-sm">Remaining Credits <span className="font-bold">{userDetails?.credits}</span></h2>
                    <Progress value={33} />
                    <Button className="w-full">Upgrade to ProPlan</Button>
                </div>
                <div className="flex justify-between items-center gap-2">
                    <UserButton />
                    <Button variant={"ghost"}>Settings</Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}