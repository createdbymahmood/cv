import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MONTH_INDEX_BY_NAME = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
} as const;

function parseMonthYear(value: string) {
  const [month, year] = value.split(" ");
  const monthIndex = MONTH_INDEX_BY_NAME[month as keyof typeof MONTH_INDEX_BY_NAME];
  const numericYear = Number(year);

  if (monthIndex === undefined || Number.isNaN(numericYear)) {
    return null;
  }

  return { monthIndex, year: numericYear };
}

function formatDuration(totalMonths: number) {
  if (totalMonths <= 0) {
    return null;
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [];

  if (years > 0) {
    parts.push(`${years} yr${years === 1 ? "" : "s"}`);
  }

  if (months > 0) {
    parts.push(`${months} mo${months === 1 ? "" : "s"}`);
  }

  return parts.join(" ") || "0 mos";
}

export function getDateRangeWithDurationParts(start: string, end?: string) {
  const parsedStart = parseMonthYear(start);
  const endLabel = end ?? "Present";
  const dateRange = `${start} - ${endLabel}`;

  if (!parsedStart) {
    return { dateRange, duration: null };
  }

  const parsedEnd =
    end && end !== "Present"
      ? parseMonthYear(end)
      : { monthIndex: new Date().getMonth(), year: new Date().getFullYear() };

  if (!parsedEnd) {
    return { dateRange, duration: null };
  }

  const totalMonths =
    (parsedEnd.year - parsedStart.year) * 12 +
    (parsedEnd.monthIndex - parsedStart.monthIndex) +
    1;
  const duration = formatDuration(totalMonths);

  return { dateRange, duration };
}
