import { useEffect, useState } from 'react';
import styles from './filterButton.module.css';
import 'material-symbols';

interface FilterButtonProps {
  options: string[];
  label: string;
  onSelect: (option: string | undefined) => void;
}

export default function FilterButton({ options, label, onSelect }: FilterButtonProps) {
  const [selected, setSelected] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (document === null || !open) return;
    const pointerdown = () => setOpen(false);
    document.addEventListener('pointerdown', pointerdown);
    return () => document.removeEventListener('pointerdown', pointerdown);
  }, [open]);

  return (
    <div className={styles.container}>
      <div
        className={styles.buttonContainer}
        onPointerDown={(e) => {
          e.stopPropagation();
          setOpen((open) => !open);
        }}
      >
        <span className="material-symbols-outlined">arrow_drop_down_circle</span>
        <p className={styles.text}>{selected ?? label}</p>
      </div>
      <ul className={styles.optionsList} style={open ? undefined : { display: 'none' }}>
        {options.map((v) => {
          return (
            <li
              className={`${styles.optionItem} ${v === selected ? styles.selected : ''}`}
              key={v}
              onPointerDown={() => setSelected(v)}
            >
              <p>{v}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
