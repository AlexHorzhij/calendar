export interface Day {
  date: Date;
  monthName: string;
  isMarginal: boolean;
  isCurrentMonth: boolean;
}

export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

export interface Task {
  id: string;
  title: string;
  date: Date;
}
