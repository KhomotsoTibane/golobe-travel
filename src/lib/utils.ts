import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { tz, TZDate } from "@date-fns/tz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number) => {
  const currency = "ZAR";
  const locale = "en-ZA";
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
};

export const toHotelDateAndTime = (
  date: Date | string,
  time: string,
  timeZone = "Africa/Johannesburg"
) => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date input");
  }
  const [hours, minutes] = time.split(":").map(Number);

  const tzDate = new TZDate(
    parsedDate.getFullYear(),
    parsedDate.getMonth(),
    parsedDate.getDate(),
    timeZone
  );
  tzDate.setHours(hours);
  tzDate.setMinutes(minutes);
  return tzDate;
};

export function fromIsoToOffsetParts(isoString: string): { localDate: string; localTime: string } {
  const date = new Date(isoString);

  // Manually adjust to Johannesburg time (UTC+2)
  const saTime = new Date(date.getTime() + 2 * 60 * 60 * 1000);

  // Format date parts manually
  const localDate = saTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC", // Treat shifted date as UTC
  });

  const localTime = saTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });

  return {
    localDate,
    localTime,
  };
}
