import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'


const menuOptions = [
    { name: "Pricing", href: "/pricing" },
    { name: "Contact Us", href: "/contact" },
]

const Header = () => {
    return (
        <header className='flex justify-between items-center p-5 shadow-md z-30 bg-white fixed top-0 left-0 right-0 w-full'>
            <div className="flex items-center gap-3">
                <Image
                    src={"/logo.svg"}
                    alt='logo'
                    width={35}
                    height={35}
                    className="object-contain"
                />
                <h2 className="font-bold text-xl">AstraPages</h2>
            </div>
            <div className="hidden sm:flex gap-3 items-center">
                {menuOptions.map((option, index) => (
                    <Button key={index} variant={"ghost"}>{option.name}</Button>
                ))}
            </div>
            <div className="">
                <SignedOut>
                    <SignUpButton mode="modal" forceRedirectUrl={"/workspace"}>
                        <Button>Get Started</Button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <Button asChild>
                        <Link href={"/workspace"}>Get Started</Link>
                    </Button>
                </SignedIn>
            </div>
        </header>
    )
}

export default Header