import RepeatableSection from "../../ui/RepeatableSection.jsx";
import Field from "../../ui/Field.jsx";
import BulletListEditor from "../../ui/BulletListEditor.jsx";
import DateRangePicker from "../../ui/DateRangePicker.jsx";
import styles from "./Step.module.css";

const EMPTY = { title: "", company: "", location: "", dates: "", bullets: [] };

export default function ExperienceStep({ data, onChange, tr }) {
  const e = tr.experience;
  return (
    <RepeatableSection
      items={data}
      onChange={onChange}
      emptyItem={EMPTY}
      addLabel={e.add}
      renderItem={(item, update) => (
        <div className={styles.stack}>
          <div className={styles.grid2}>
            <Field label={e.jobTitle} value={item.title} placeholder={e.titlePh} onChange={(v) => update({ ...item, title: v })} />
            <Field label={e.company} value={item.company} placeholder={e.companyPh} onChange={(v) => update({ ...item, company: v })} />
            <Field label={e.location} value={item.location} placeholder={e.locationPh} onChange={(v) => update({ ...item, location: v })} />
          </div>
          <DateRangePicker
            value={item.dates}
            startLabel={e.dateStart}
            endLabel={e.dateEnd}
            presentLabel={e.present}
            onChange={(v) => update({ ...item, dates: v })}
          />
          <p className={styles.sectionLabel}>{e.bullets}</p>
          <BulletListEditor items={item.bullets} onChange={(v) => update({ ...item, bullets: v })} placeholder={e.bulletPh} />
        </div>
      )}
    />
  );
}
