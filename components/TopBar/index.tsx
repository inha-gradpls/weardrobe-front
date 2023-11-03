'use client';
import styles from './topBar.module.css';
import IconButton from '../Button/IconButton';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface TopBarProps {
  backButton: boolean;
  children?: ReactNode;
  actions?: ReactNode;
}

export default function TopBar({ backButton, actions, children }: TopBarProps) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      {backButton ? <IconButton onClick={() => router.back()} icon="arrow_back" /> : undefined}
      <div className={styles.content}>{children}</div>
      <div className={styles.actions}>{actions}</div>
    </div>
  );
}
