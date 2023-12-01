'use client';
import { useNavigation } from '@/states/navigation';
import styles from './navigationBar.module.css';
import 'material-symbols';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface NavigationBarProps {
  pages: NavigationPage[];
}

export default function NavigationBar({ pages }: NavigationBarProps) {
  const [page, setPage] = useState<NavigationPage>('HOME');
  const router = useRouter();
  return (
    <div className={styles.container}>
      {pages.map((p) => {
        return (
          <NavigationItem
            key={p}
            page={p}
            onClick={() => {
              setPage(p);
              router.push(pageToUrl(p));
            }}
            current={p === page}
          />
        );
      })}
    </div>
  );
}

interface NavigationItemProps {
  page: NavigationPage;
  onClick: () => void;
  current: boolean;
}

function NavigationItem({ page, onClick, current }: NavigationItemProps) {
  return (
    <div className={styles.item} onClick={onClick}>
      <span className={`material-symbols-outlined ${styles.icon} ${current && styles.enabled}`}>
        {pageToIcon(page)}
      </span>
      <p>{pageToLabel(page)}</p>
    </div>
  );
}

function pageToIcon(page: NavigationPage) {
  switch (page) {
    case 'HOME':
      return 'home';
    case 'WARDROBE':
      return 'checkroom';
    case 'MYPAGE':
      return 'person';
  }
}

function pageToLabel(page: NavigationPage) {
  switch (page) {
    case 'HOME':
      return '홈';
    case 'WARDROBE':
      return '옷장';
    case 'MYPAGE':
      return '마이페이지';
  }
}

function pageToUrl(page: NavigationPage) {
  switch (page) {
    case 'HOME':
      return '/';
    case 'WARDROBE':
      return '/wardrobe';
    case 'MYPAGE':
      return '/my';
  }
}
