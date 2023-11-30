import { HTMLAttributes } from 'react';
import styles from './input.module.css';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  fill?: boolean;
  name?: string;
}

export default function Input({ fill, ...props }: InputProps) {
  return (
    <input className={styles.input} style={fill === true ? { flex: 1 } : undefined} {...props} />
  );
}
