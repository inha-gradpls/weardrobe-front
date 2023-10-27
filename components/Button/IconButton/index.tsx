'use client';
import styles from './iconButton.module.css';
import 'material-symbols';

interface IconButtonProps {
  label?: string;
  icon?: string;
  onClick: () => void;
}

export default function IconButton({ label, icon, onClick }: IconButtonProps) {
  return (
    <div className={styles.container}>
      {icon === undefined ? undefined : (
        <span className={`material-symbols-outlined ${styles.icon}`}>{icon}</span>
      )}
      {label === undefined ? undefined : <p>{label}</p>}
    </div>
  );
}
