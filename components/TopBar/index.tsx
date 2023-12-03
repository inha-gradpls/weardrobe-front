'use client';
import styles from './topBar.module.css';
import IconButton from '../Button/IconButton';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface TopBarProps {
  backButton: boolean;
  onBack?: () => void;
  children?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
}

export default function TopBar({ backButton, onBack, actions, children, footer }: TopBarProps) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {backButton && (
          <IconButton
            styleType="transparent"
            onClick={onBack || (() => router.back())}
            icon="arrow_back"
          />
        )}
        <div className={styles.content}>{children}</div>
        <div className={styles.actions}>{actions}</div>
      </div>
      {footer}
    </div>
  );
}
