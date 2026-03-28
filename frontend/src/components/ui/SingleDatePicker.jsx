import { useState, useEffect } from "react";
import { MONTHS, YEARS, formatSingle, parseSingle } from "../../lib/dates.js";
import styles from "./DatePicker.module.css";

export default function SingleDatePicker({ value, onChange }) {
  const [state, setState] = useState(() => parseSingle(value));

  useEffect(() => {
    onChange(formatSingle(state.month, state.year));
  }, [state]);

  function set(key, val) {
    setState((prev) => ({ ...prev, [key]: val }));
  }

  return (
    <div className={styles.selects}>
      <select className={styles.select} value={state.month} onChange={(e) => set("month", e.target.value)}>
        <option value="">Month</option>
        {MONTHS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
      </select>
      <select className={styles.select} value={state.year} onChange={(e) => set("year", e.target.value)}>
        <option value="">Year</option>
        {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
      </select>
    </div>
  );
}
