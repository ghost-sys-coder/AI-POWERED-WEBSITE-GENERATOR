import React from 'react'
import { BadgeDollarSignIcon, Contact2Icon } from 'lucide-react'
import Link from 'next/link'

const menuOptions = [
    { name: "Pricing", href: "/pricing", icon: BadgeDollarSignIcon },
    { name: "Contact Us", href: "/contact", icon: Contact2Icon },
]

const HomePageFooter = () => {
    return (
        <footer className='md:hidden flex justify-between items-center gap-5 p-5 bg-white shadow-md sticky bottom-0'>
            {menuOptions.map((option, index) => {
                const Icon = option.icon;

                return (
                    <Link className='flex gap-1 flex-col justify-center items-center' key={index} href={option.href}>
                        <Icon size={20} />
                        <span className='text-sm'>{option.name}</span>
                    </Link>
                )
            })}
        </footer>
    )
}

export default HomePageFooter