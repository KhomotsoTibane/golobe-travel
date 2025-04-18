import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format as formatTz } from "date-fns-tz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number) => {
  const currency = "ZAR";
  const locale = "en-ZA";
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
};

export const toZuluDateTime = (date: Date, time: string, timeZone = "Africa/Johannesburg") => {
  // ⛳️ Split the time string — not the date!
  const [hours, minutes] = time.split(":").map(Number);

  // Copy date and apply time
  const combined = new Date(date);
  combined.setHours(hours);
  combined.setMinutes(minutes);
  combined.setSeconds(0);
  combined.setMilliseconds(0);

  // Format with timezone offset
  return formatTz(combined, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone });
};
