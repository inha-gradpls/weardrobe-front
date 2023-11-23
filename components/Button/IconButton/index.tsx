'use client';
import styles from './iconButton.module.css';
import 'material-symbols';

type StyleTypes = 'primary' | 'secondary' | 'none';

interface IconButtonProps {
  label?: string;
  icon?: string;
  style?: StyleTypes;
  onClick: () => void;
}

export default function IconButton({ label, icon, onClick, style = 'none' }: IconButtonProps) {
  return (
    <div className={`${styles.container} ${getClassName(style)}`} onClick={onClick}>
      {icon === undefined ? undefined : (
        <span className={`material-symbols-outlined ${styles.icon}`}>{icon}</span>
      )}
      {label === undefined ? undefined : <p>{label}</p>}
    </div>
  );
}

function getClassName(style: StyleTypes) {
  switch (style) {
    case 'primary':
      return styles.primary;
    case 'secondary':
      return styles.secondary;
    case 'none':
      return '';
  }
}
