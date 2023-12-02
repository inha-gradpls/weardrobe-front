import TopBar from '@/components/TopBar';
import styles from './searchOverlay.module.css';
import { useEffect, useState } from 'react';
import { getSearchHistory } from '@/utils/api';
import IconButton from '@/components/Button/IconButton';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';

interface SearchOverlayProps {
  onBack: () => void;
  defaultValue?: string;
}

export default function SearchOverlay({ onBack, defaultValue }: SearchOverlayProps) {
  const router = useRouter();
  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault();
        // read form data to json
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const json = Object.fromEntries(formData.entries());
        router.push(`/search?q=${json.q as string}`);
      }}
    >
      <TopBar
        backButton={true}
        onBack={onBack}
        footer={<SearchHistory />}
        actions={<IconButton type="submit" icon="search" styleType="transparent" />}
      >
        <Input fill={true} name="q" defaultValue={defaultValue} />
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
        <IconButton
          key={v.id}
          onClick={(e) => {
            e.preventDefault();
            router.push(`/search?q=${v.word}`);
          }}
          label={v.word}
        />
      ))}
    </div>
  );
}

export function useSearch(defaultValue?: string) {
  const [search, setSearch] = useState<boolean>(false);

  useEffect(() => {
    return () => setSearch(false);
  }, [defaultValue]);

  const searchOverlay = (
    <SearchOverlay defaultValue={defaultValue} onBack={() => setSearch(false)} />
  );

  return { search, setSearch, searchOverlay };
}
