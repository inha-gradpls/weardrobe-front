import { HTMLAttributes } from 'react';
import styles from './input.module.css';

interface InputProps extends HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  fill?: boolean;
  name?: string;
  type?: 'text' | 'number' | 'textArea' | 'file';
  accept?: string;
}

export default function Input({ fill, type, ...props }: InputProps) {
  if (type === 'textArea') {
    return (
      <textarea
        rows={10}
        className={styles.input}
        style={fill === true ? { flex: 1 } : undefined}
        {...props}
      />
    );
  }
  return (
    <input
      type={type}
      className={styles.input}
      style={fill === true ? { flex: 1 } : undefined}
      {...props}
    />
  );
}
