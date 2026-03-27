import styles from "./BulletListEditor.module.css";

export default function BulletListEditor({ items, onChange, placeholder = "Add a bullet point..." }) {
  function update(i, field, value) {
    const next = [...items];
    next[i] = { ...next[i], [field]: value };
    onChange(next);
  }

  function add() {
    onChange([...items, { text: "", bold: false }]);
  }

  function remove(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  return (
    <div className={styles.wrapper}>
      {items.map((item, i) => (
        <div key={i} className={styles.row}>
          <span className={styles.bullet}>•</span>
          <textarea
            className={[styles.input, item.bold ? styles.inputBold : ""].filter(Boolean).join(" ")}
            value={item.text}
            rows={2}
            placeholder={placeholder}
            onChange={(e) => update(i, "text", e.target.value)}
          />
          <div className={styles.controls}>
            <button
              type="button"
              className={[styles.boldBtn, item.bold ? styles.boldActive : ""].filter(Boolean).join(" ")}
              onClick={() => update(i, "bold", !item.bold)}
              title="Toggle bold"
            >
              B
            </button>
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => remove(i)}
              title="Remove"
            >
              ×
            </button>
          </div>
        </div>
      ))}
      <button type="button" className={styles.addBtn} onClick={add}>
        + Add bullet
      </button>
    </div>
  );
}
