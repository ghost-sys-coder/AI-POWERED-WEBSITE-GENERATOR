import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomColors() {
  const colors = [
    "text-red-500",
    "text-blue-500",
    "text-green-500",
    "text-purple-500",
    "text-pink-500",
    "text-orange-500",
    "text-teal-500",
    "text-indigo-500",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}

// generate four random numbers
export function generateFourRandomNumbers(): number[]{
  const numbers: number[] = [];
  while (numbers.length < 4) {
    const randomNum = Math.floor(Math.random() * 10); // Random number between 0-9
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }
  return numbers;
}
