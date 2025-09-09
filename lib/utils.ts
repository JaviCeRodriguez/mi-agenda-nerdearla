import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Talk } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Conference days configuration
export const CONFERENCE_DAYS = [
  { id: "martes-23", label: "Martes 23", date: "23/07" },
  { id: "miercoles-24", label: "Miércoles 24", date: "24/07" },
  { id: "jueves-25", label: "Jueves 25", date: "25/07" },
  { id: "viernes-26", label: "Viernes 26", date: "26/07" },
  { id: "sabado-27", label: "Sábado 27", date: "27/07" },
] as const;

// Available tracks
export const CONFERENCE_TRACKS = [
  "DEVELOPMENT",
  "DATA SCIENCE / AI",
  "SECURITY",
  "INFRASTRUCTURE",
  "UX",
  "MANAGEMENT",
  "TESTING",
  "KIDS",
  "MAKER/RETRO",
  "NERD",
  "OPEN SOURCE",
  "PRODUCT",
  "SOFTSKILLS",
] as const;

// Day ID to day name mapping
export const DAY_ID_TO_NAME: Record<string, string> = {
  "martes-23": "Martes 23",
  "miercoles-24": "Miércoles 24",
  "jueves-25": "Jueves 25",
  "viernes-26": "Viernes 26",
  "sabado-27": "Sábado 27",
};

// Default selected day
export const DEFAULT_DAY = "martes-23";

// Track color mapping based on the legend
export const TRACK_COLORS: Record<
  string,
  { bg: string; text: string; border?: string }
> = {
  "DATA SCIENCE / AI": { bg: "bg-yellow-400", text: "text-black" },
  DEVELOPMENT: { bg: "bg-red-500", text: "text-white" },
  INFRASTRUCTURE: { bg: "bg-blue-500", text: "text-white" },
  KIDS: { bg: "bg-orange-500", text: "text-white" },
  "MAKER/RETRO": { bg: "bg-slate-600", text: "text-white" },
  MANAGEMENT: { bg: "bg-cyan-400", text: "text-black" },
  NERD: { bg: "bg-purple-500", text: "text-white" },
  "OPEN SOURCE": { bg: "bg-green-500", text: "text-white" },
  PRODUCT: { bg: "bg-orange-500", text: "text-white" },
  SECURITY: { bg: "bg-slate-600", text: "text-white" },
  SOFTSKILLS: { bg: "bg-red-400", text: "text-white" },
  TESTING: { bg: "bg-teal-500", text: "text-white" },
  UX: { bg: "bg-slate-400", text: "text-white" },
};

/**
 * Filters talks based on day and track criteria
 */
export function filterTalks(
  talks: Talk[],
  day?: string,
  tracks?: string[]
): Talk[] {
  let filteredTalks = talks;

  // Filter by day
  if (day) {
    const dayName = DAY_ID_TO_NAME[day];
    if (dayName) {
      filteredTalks = filteredTalks.filter((talk) => talk.day === dayName);
    }
  }

  // Filter by tracks
  if (tracks && tracks.length > 0) {
    filteredTalks = filteredTalks.filter((talk) => tracks.includes(talk.track));
  }

  return filteredTalks;
}

/**
 * Converts Next.js searchParams to URLSearchParams for parsing
 */
export function convertSearchParamsToURLSearchParams(searchParams: {
  [key: string]: string | string[] | undefined;
}): URLSearchParams {
  const urlSearchParams = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      urlSearchParams.set(key, value);
    } else if (Array.isArray(value)) {
      urlSearchParams.set(key, value.join(","));
    }
  });
  return urlSearchParams;
}

// Color variants mapping for track badges
const TRACK_COLOR_VARIANTS: Record<
  string,
  {
    light: string;
    medium: string;
    full: string;
    textLight: string;
    textMedium: string;
    textFull: string;
  }
> = {
  "bg-red-500": {
    light: "bg-red-100",
    medium: "bg-red-350",
    full: "bg-red-500",
    textLight: "text-red-500",
    textMedium: "text-white",
    textFull: "text-white",
  },
  "bg-yellow-400": {
    light: "bg-yellow-100",
    medium: "bg-yellow-350",
    full: "bg-yellow-400",
    textLight: "text-yellow-500",
    textMedium: "text-white",
    textFull: "text-black",
  },
  "bg-blue-500": {
    light: "bg-blue-100",
    medium: "bg-blue-350",
    full: "bg-blue-500",
    textLight: "text-blue-500",
    textMedium: "text-white",
    textFull: "text-white",
  },
  "bg-orange-500": {
    light: "bg-orange-100",
    medium: "bg-orange-350",
    full: "bg-orange-500",
    textLight: "text-orange-500",
    textMedium: "text-white",
    textFull: "text-white",
  },
  "bg-slate-600": {
    light: "bg-slate-100",
    medium: "bg-slate-350",
    full: "bg-slate-600",
    textLight: "text-slate-500",
    textMedium: "text-white",
    textFull: "text-white",
  },
  "bg-cyan-400": {
    light: "bg-cyan-100",
    medium: "bg-cyan-350",
    full: "bg-cyan-400",
    textLight: "text-cyan-500",
    textMedium: "text-white",
    textFull: "text-black",
  },
  "bg-purple-500": {
    light: "bg-purple-100",
    medium: "bg-purple-350",
    full: "bg-purple-500",
    textLight: "text-purple-500",
    textMedium: "text-white",
    textFull: "text-white",
  },
  "bg-green-500": {
    light: "bg-green-100",
    medium: "bg-green-350",
    full: "bg-green-500",
    textLight: "text-green-500",
    textMedium: "text-white",
    textFull: "text-white",
  },
  "bg-teal-500": {
    light: "bg-teal-100",
    medium: "bg-teal-350",
    full: "bg-teal-500",
    textLight: "text-teal-500",
    textMedium: "text-white",
    textFull: "text-white",
  },
  "bg-slate-400": {
    light: "bg-slate-100",
    medium: "bg-slate-350",
    full: "bg-slate-400",
    textLight: "text-slate-500",
    textMedium: "text-white",
    textFull: "text-white",
  },
  "bg-red-400": {
    light: "bg-red-100",
    medium: "bg-red-350",
    full: "bg-red-400",
    textLight: "text-red-500",
    textMedium: "text-white",
    textFull: "text-white",
  },
};

/**
 * Gets the appropriate CSS classes for track badges based on selection state
 */
export function getTrackBadgeClasses(
  track: string,
  isSelected: boolean
): string {
  const trackColor = TRACK_COLORS[track];
  if (!trackColor) {
    return isSelected
      ? "bg-gray-500 hover:bg-gray-500 text-white border-gray-500"
      : "bg-gray-100 hover:bg-gray-350 text-gray-500 hover:text-white border-gray-100";
  }

  const variants = TRACK_COLOR_VARIANTS[trackColor.bg] || {
    light: "bg-gray-100",
    medium: "bg-gray-350",
    full: "bg-gray-500",
    textLight: "text-gray-500",
    textMedium: "text-white",
    textFull: "text-white",
  };

  if (isSelected) {
    return `${variants.full} hover:${variants.full} ${variants.textFull} border-transparent`;
  }

  // Unselected: light color, hover: medium color
  return `border-transparent ${variants.light} ${variants.textLight} hover:${variants.medium} hover:${variants.textMedium}`;
}
