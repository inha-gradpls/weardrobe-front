'use client';
import { HTMLAttributes, ReactNode } from 'react';
import styles from './bottomModal.module.css';

interface BottomModalProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onClose: () => void;
  fill?: boolean;
}

export default function BottomModal({
  children,
  onClose,
  fill = false,
  ...props
}: BottomModalProps) {
  return (
    <div className={`${styles.container}`} onClick={onClose}>
      <div
        className={`${styles.content}  ${fill && styles.fill}`}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
