import { useNavigation } from '@/states/navigation';
import styles from './navigationBar.module.css';

interface NavigationBarProps {
  pages: NavigationPage[];
}

export default function NavigationBar({ pages }: NavigationBarProps) {
  return (
    <div className={styles.container}>
      {pages.map((p) => {
        return <NavigationItem key={p} page={p} />;
      })}
    </div>
  );
}

interface NavigationItemProps {
  page: NavigationPage;
}
function NavigationItem({ page }: NavigationItemProps) {
  const { currentPage, setPage } = useNavigation((state) => ({
    currentPage: state.page,
    setPage: state.setNavigationPage,
  }));

  return (
    <div className={styles.item} onClick={() => setPage(page)}>
      <span
        className={`material-symbols-outlined ${styles.icon} ${
          page === currentPage ? styles.enabled : ''
        }`}
      >
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
