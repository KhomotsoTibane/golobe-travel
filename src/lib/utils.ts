import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number) => {
  const currency = "ZAR";
  const locale = "en-ZA";
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
};
