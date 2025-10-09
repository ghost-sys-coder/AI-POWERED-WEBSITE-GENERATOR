import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const menuOptions = [
    { name: "Pricing", href: "/pricing" },
    { name: "Contact Us", href: "/contact" },
]

const Header = () => {
    return (
        <header className='flex justify-between items-center p-5 shadow-md'>
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
            <div className="flex gap-3 items-center">
                {menuOptions.map((option, index) => (
                    <Button key={index} variant={"ghost"}>{option.name}</Button>
                ))}
            </div>
            <div className="">
                <Button>Get Started</Button>
            </div>
        </header>
    )
}

export default Header