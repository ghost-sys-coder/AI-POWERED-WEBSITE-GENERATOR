import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { SidebarTrigger } from '@/components/ui/sidebar'

const WorkspaceAppHeader = () => {
    return (
        <div className='w-full relative'>
            <div className="flex justify-between gap-4 shadow-md rounded-md p-4 z-50 absolute top-0 bg-white w-full">
                <SidebarTrigger />
                <UserButton />
            </div>
        </div>
    )
}

export default WorkspaceAppHeader