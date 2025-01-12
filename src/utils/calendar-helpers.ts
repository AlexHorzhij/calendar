import { Day } from "../types/calendar";

export function getMonthDays(month: number = new Date().getMonth()): {
  date: Date;
  days: Day[];
  year: number;
} {
  const currentYear = new Date().getFullYear();
  const date = new Date(currentYear, month);
  const firstDay = new Date(currentYear, month, 1);
  const lastDay = new Date(currentYear, month + 1, 0);

  const monthName = date.toLocaleString("en-EN", { month: "short" });

  const days: Day[] = [];

  const startPadding = firstDay.getDay();

  const prevMonthName = new Date(currentYear, month - 1).toLocaleString(
    "en-EN",
    {
      month: "short",
    }
  );

  for (let i = startPadding - 1; i >= 0; i--) {
    const isMarginal = i === 0 ? true : false;
    days.push({
      date: new Date(currentYear, month, -i),
      monthName: prevMonthName,
      isMarginal,
      isCurrentMonth: false,
    });
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    let isMarginal;
    if (i === 1 || i === lastDay.getDate()) {
      isMarginal = true;
    } else {
      isMarginal = false;
    }
    days.push({
      date: new Date(currentYear, month, i),
      monthName: monthName,
      isMarginal,
      isCurrentMonth: true,
    });
  }

  const endPadding = 42 - days.length;

  const nextMonthName = new Date(currentYear, month - 1).toLocaleString(
    "en-EN",
    {
      month: "short",
    }
  );
  for (let i = 1; i <= endPadding; i++) {
    const isMarginal = i === 1 ? true : false;

    days.push({
      date: new Date(currentYear, month + 1, i),
      monthName: nextMonthName,
      isMarginal,
      isCurrentMonth: false,
    });
  }
  const year = date.getFullYear();

  return { days, year, date };
}

type DataNameType = "short" | "long";

export function getWeekDaysName(
  type: DataNameType = "short",
  lang: string = "EN"
) {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(2023, 1, i + 1);
    return Intl.DateTimeFormat(lang, { weekday: type }).format(date);
  });
}
