import React from "react";

import styles from "./styles.scss";

type CalendarProps = {
  date: Date;
  className?: string;
};

const Calendar: React.FC<CalendarProps> = ({ date, className }: CalendarProps) => {
  return (
    <time className={[styles.calendarWrap, className].join(" ")}>
      <span data-testid="day" className={styles.day}>
        {date.getDate().toString().padStart(2, '0')}
      </span>
      <span data-testid="month" className={styles.month}>
        {date.toLocaleString("pt-BR", { month: "short" }).replace(".", "")}
      </span>
      <span data-testid="year" className={styles.year}>
        {date.getFullYear()}
      </span>
    </time>
  );
};

export default Calendar;