import TopBar from '@/components/TopBar';
import styles from './searchOverlay.module.css';
import { useEffect, useState } from 'react';
import { getSearchHistory } from '@/utils/api';
import IconButton from '@/components/Button/IconButton';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';

interface SearchOverlayProps {
  onBack: () => void;
}

export default function SearchOverlay({ onBack }: SearchOverlayProps) {
  return (
    <form className={styles.container} action="/search">
      <TopBar
        backButton={true}
        onBack={onBack}
        footer={<SearchHistory />}
        actions={<IconButton type="submit" icon="search" styleType="transparent" />}
      >
        <Input fill={true} name="q" />
      </TopBar>
    </form>
  );
}

function SearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const res = await getSearchHistory();
      if (res === undefined) return;
      setHistory(res);
    })();
  }, []);

  return (
    <div className={styles.historyContainer}>
      {history.map((v) => (
        <IconButton key={v.id} onClick={() => router.push(`/search?q=${v.word}`)} label={v.word} />
      ))}
    </div>
  );
}
