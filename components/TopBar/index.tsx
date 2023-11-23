'use client';
import styles from './topBar.module.css';
import IconButton from '../Button/IconButton';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface TopBarProps {
  backButton: boolean;
  children?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
}

export default function TopBar({ backButton, actions, children, footer }: TopBarProps) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {backButton ? <IconButton onClick={() => router.back()} icon="arrow_back" /> : undefined}
        <div className={styles.content}>{children}</div>
        <div className={styles.actions}>{actions}</div>
      </div>
      {footer}
    </div>
  );
}
