"use client";
import React, { useState } from 'react'
import { HomeIcon, ImagePlusIcon, Key, LayoutDashboard, Send, User } from 'lucide-react'
import { Button } from '@/components/ui/button'


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

const Hero = () => {
    const [userInput, setUserInput] = useState<string | "">("");

    const handleSuggestion = (value: string) => {
        setUserInput(value); 
    }


    return (
        <div className='h-[80vh] flex flex-col gap-3 items-center justify-center p-5'>
            <h2 className="font-bold text-6xl">What should we build today?</h2>
            <p className="text-2xl mt-2 text-gray-500">Let&apos;s create something amazing with Next.js!</p>
            <p className="text-xl mt-2 text-gray-500">Generate, edit and explore designs with AI. Export your code!</p>

            <div className="w-full max-w-xl p-5 rounded-xl border mt-5 relative">
                <textarea
                    placeholder='Describe your page design'
                    className='h-24 w-full focus:outline-none focus:ring-0 focus:resize-none'
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <div className="flex w-full justify-between items-center gap-3">
                    <Button variant={"ghost"} className='cursor-pointer'>
                        <ImagePlusIcon />
                    </Button>
                    <Button className='cursor-pointer'><Send size={10} /></Button>
                </div>
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