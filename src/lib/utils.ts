import { type ClassValue, clsx } from "clsx";
import { addDays, addMonths } from "date-fns";
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

export const periodicities = [
  "Diariamente",
  "Semanalmente",
  "A cada duas semanas",
  "A cada 15 dias",
  "A cada 30 dias",
  "Mesmo dia, próximo mês",
];

export const getNewControlDate = (today: Date, period: string) => {
  switch (period) {
    case periodicities[0]:
      return addDays(today, 1);

    case periodicities[1]:
      return addDays(today, 7);

    case periodicities[2]:
      return addDays(today, 14);
    case periodicities[3]:
      return addDays(today, 15);
    case periodicities[4]:
      return addDays(today, 30);
    case periodicities[5]:
      return addMonths(today, 1);
  }
  return today;
};
