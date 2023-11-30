'use client';
import { HTMLAttributes } from 'react';
import styles from './iconButton.module.css';
import 'material-symbols';

type StyleTypes = 'primary' | 'secondary' | 'none' | 'transparent';

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: string;
  styleType?: StyleTypes;
  onClick?: () => void;
  type?: 'submit';
}

export default function IconButton({
  label,
  icon,
  onClick,
  styleType = 'none',
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`${styles.container} ${getClassName(styleType)}`}
      onClick={onClick}
      {...props}
    >
      {icon === undefined ? undefined : (
        <span className={`material-symbols-outlined ${styles.icon}`}>{icon}</span>
      )}
      {label === undefined ? undefined : <p>{label}</p>}
    </button>
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
    case 'transparent':
      return styles.transparent;
  }
}
