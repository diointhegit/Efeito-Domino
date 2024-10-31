import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const containsSequentialNumbers = (password: string) => {
  const onlyNumbers = password.replace(/\D/g, "");
  let numbersArray: string[] = [];
  for (const num of onlyNumbers) {
    numbersArray.push(num);
  }

  for (let i = 0; i < numbersArray.length; i++) {
    console.log(Number(numbersArray[i + 1]), Number(numbersArray[i]) + 1);
    if (Number(numbersArray[i + 1]) == Number(numbersArray[i]) + 1) {
      return true;
    }
  }
  return false;
};
