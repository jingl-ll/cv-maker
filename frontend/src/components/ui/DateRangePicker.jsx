import { useState, useEffect } from "react";
import { MONTHS, YEARS, formatRange, parseRange } from "../../lib/dates.js";
import styles from "./DatePicker.module.css";

export default function DateRangePicker({ value, onChange, presentLabel = "Present", startLabel = "Start", endLabel = "End" }) {
  const [state, setState] = useState(() => parseRange(value));

  useEffect(() => {
    onChange(formatRange(state.startMonth, state.startYear, state.endMonth, state.endYear, state.present));
  }, [state]);

  function set(key, val) {
    setState((prev) => ({ ...prev, [key]: val }));
  }

  return (
    <div className={styles.rangeWrapper}>
      <div className={styles.dateGroup}>
        <span className={styles.groupLabel}>{startLabel}</span>
        <div className={styles.selects}>
          <select className={styles.select} value={state.startMonth} onChange={(e) => set("startMonth", e.target.value)}>
            <option value="">Month</option>
            {MONTHS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
          <select className={styles.select} value={state.startYear} onChange={(e) => set("startYear", e.target.value)}>
            <option value="">Year</option>
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      <span className={styles.rangeSep}>—</span>

      <div className={styles.dateGroup}>
        <span className={styles.groupLabel}>{endLabel}</span>
        <div className={styles.selects}>
          {!state.present && (
            <>
              <select className={styles.select} value={state.endMonth} onChange={(e) => set("endMonth", e.target.value)}>
                <option value="">Month</option>
                {MONTHS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
              <select className={styles.select} value={state.endYear} onChange={(e) => set("endYear", e.target.value)}>
                <option value="">Year</option>
                {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </>
          )}
          <label className={styles.presentToggle}>
            <input
              type="checkbox"
              checked={state.present}
              onChange={(e) => set("present", e.target.checked)}
            />
            {presentLabel}
          </label>
        </div>
      </div>
    </div>
  );
}
