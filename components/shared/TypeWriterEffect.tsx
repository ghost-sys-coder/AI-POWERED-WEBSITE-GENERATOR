import { cn, getRandomColors } from '@/lib/utils';
import React, { useEffect, useState } from 'react'

const TypeWriterEffect: React.FC<TypewriterProps> = ({ text, delay, infinite }) => {
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (currentIndex < text.length) {
            timeout = setTimeout(() => {
                setCurrentText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, delay || 150);
        } else if (infinite) {
            setCurrentIndex(0);
            setCurrentText("");
        };
        return () => clearTimeout(timeout);
    }, [currentIndex, text, delay, infinite]);

    return (
        <p className='flex gap-3'>
            {currentText.split("").map((char, index) => (
                <span key={index} className={cn(
                    "letter text-2xl md:text-4xl font-medium",
                    getRandomColors())}>
                    {char}
                </span>
            ))}
        </p>
    )
}

export default TypeWriterEffect