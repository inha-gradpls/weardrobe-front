import { RefObject, useEffect, useState } from 'react';
import { API_BASE_URL, BLUR_URL } from './api';

const DAY = 86400000;
const HOUR = 3600000;
const MINUTE = 60000;

export function tsToDeltaStr(ts: string) {
  const date = new Date(ts);
  const diff = new Date().getTime() - date.getTime();
  if (diff >= DAY) return `${Math.floor(diff / DAY)}일 전`;
  if (diff >= HOUR) return `${Math.floor(diff / HOUR)}시간 전`;
  if (diff >= MINUTE) return `${Math.floor(diff / MINUTE)}분 전`;
  return `방금전`;
}

export function dateToStr(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

export function getImageUrl(img?: string) {
  if (img === undefined) return BLUR_URL;
  if (img.startsWith('/')) return `${API_BASE_URL}${img}`;
  else return img;
}

export function useInfiniteScroll<T>(
  api: (page: number, pageSize: number) => Promise<T[] | undefined>,
  pageSize: number,
  lastItemRef: RefObject<HTMLElement>,
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [result, setResult] = useState<T[]>([]);

  useEffect(() => {
    return () => {
      setPage(0);
      setResult([]);
      setLoading(false);
    };
  }, [api]);

  useEffect(() => {
    (async () => {
      const res = await api(page, pageSize);
      if (res === undefined) return;
      setResult((state) => {
        // 요청한 시점(바로 이전 페이지) 까지만 사용
        return [...state.slice(0, pageSize * (page - 1)), ...res];
      });
      setLoading(false);
    })();
  }, [api, page, pageSize, setResult]);

  // intersection observer for infinite load
  useEffect(() => {
    // dont observe if loading or last page reached
    if (loading || lastItemRef.current === null) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setLoading(true);
      // load more
      setPage(page + 1);
    });
    observer.observe(lastItemRef.current);
    return () => observer.disconnect();
  }, [lastItemRef, loading, page]);

  return { page, loading, setPage, setLoading, result };
}
