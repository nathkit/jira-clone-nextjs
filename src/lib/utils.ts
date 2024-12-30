import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateInviteCode(length: number) {
  const characters = [
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // A-Z
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)), // a-z
    ...Array.from({ length: 10 }, (_, i) => String.fromCharCode(48 + i)), // 0-9
  ].join('');

  let result = "";
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result;
}