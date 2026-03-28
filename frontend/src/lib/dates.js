export const MONTHS = [
  { value: "1",  label: "Jan." },
  { value: "2",  label: "Feb." },
  { value: "3",  label: "Mar." },
  { value: "4",  label: "Apr." },
  { value: "5",  label: "May"  },
  { value: "6",  label: "Jun." },
  { value: "7",  label: "Jul." },
  { value: "8",  label: "Aug." },
  { value: "9",  label: "Sep." },
  { value: "10", label: "Oct." },
  { value: "11", label: "Nov." },
  { value: "12", label: "Dec." },
];

const CURRENT_YEAR = new Date().getFullYear();
export const YEARS = Array.from({ length: CURRENT_YEAR - 1969 }, (_, i) => String(CURRENT_YEAR - i));

export function formatSingle(month, year) {
  if (!year) return "";
  if (!month) return year;
  return `${MONTHS[Number(month) - 1].label} ${year}`;
}

export function formatRange(startMonth, startYear, endMonth, endYear, present) {
  const start = formatSingle(startMonth, startYear);
  const end = present ? "Present" : formatSingle(endMonth, endYear);
  if (!start && !end) return "";
  if (!start) return end;
  if (!end) return start;
  return `${start} -- ${end}`;
}

export function parseRange(str) {
  if (!str) return { startMonth: "", startYear: "", endMonth: "", endYear: "", present: false };
  const [leftRaw = "", rightRaw = ""] = str.split(/\s*--\s*/);
  return {
    ...parseSingle(leftRaw, "start"),
    ...(rightRaw.trim().toLowerCase() === "present"
      ? { endMonth: "", endYear: "", present: true }
      : { ...parseSingle(rightRaw, "end"), present: false }),
  };
}

export function parseSingle(str, prefix = "") {
  const key = (s) => prefix ? `${prefix}${s.charAt(0).toUpperCase() + s.slice(1)}` : s;
  if (!str.trim()) return { [key("month")]: "", [key("year")]: "" };
  const parts = str.trim().split(/\s+/);
  const monthIdx = MONTHS.findIndex((m) => parts[0].startsWith(m.label.replace(".", "")));
  if (monthIdx !== -1) return { [key("month")]: String(monthIdx + 1), [key("year")]: parts[1] || "" };
  return { [key("month")]: "", [key("year")]: parts[0] || "" };
}
