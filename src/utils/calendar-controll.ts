import { useState } from "react";

export const useCalendar = (month: number, year: number) => {
  const [currentYear, setCurrentYear] = useState<number>(
    year || new Date().getFullYear()
  );
};
