'use client';
import TopBar from '@/components/TopBar';
import styles from './page.module.css';
import { useSearchParams } from 'next/navigation';
import IconButton from '@/components/Button/IconButton';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearch } from '@/components/SearchOverlay';
import { createPortal } from 'react-dom';
import { getFilters, getSearchResult } from '@/utils/api';
import ProductCard from '@/components/ProductCard';
import { useInfiniteScroll } from '@/utils/uiHelper';
import FilterButton from '@/components/Button/FilterButton';
import { useRouter } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const category = useMemo(() => {
    const newCategory = [];
    for (let i = 0; ; i++) {
      const curCategory = searchParams.get(`category${i}`);
      if (curCategory === null) break;
      newCategory.push(curCategory);
    }
    return newCategory;
  }, [searchParams]);

  const delivery = searchParams.get('delivery') === 'true';
  const brand = searchParams.get('brand') ?? undefined;
  const status = (searchParams.get('status') as 'SELL' | 'RESERVE' | 'COMP') ?? undefined;

  const router = useRouter();

  const { search, setSearch, searchOverlay } = useSearch(query);

  const searchActionButton = useMemo(
    () => (
      <IconButton
        key="topbar-search"
        onClick={() => setSearch(true)}
        icon="search"
        styleType="transparent"
      />
    ),
    [setSearch],
  );

  // get result
  const getResult = useCallback(
    async (page: number, pageSize: number) => {
      const categoryQuery = category.length === 0 ? undefined : category[category.length - 1];
      return await getSearchResult(query, page, undefined, categoryQuery, delivery, brand);
    },
    [brand, category, delivery, query],
  );

  // infinite scroll
  const lastItemRef = useRef<HTMLDivElement>(null);
  const { loading, result } = useInfiniteScroll<ProductInfo>(getResult, 10, lastItemRef);

  return (
    <>
      <TopBar
        backButton={true}
        actions={[searchActionButton]}
        footer={
          <FilterList
            key={query}
            category={category}
            query={query}
            brand={brand}
            status={status}
            delivery={delivery}
          />
        }
      >
        <h3>{query}</h3>
      </TopBar>
      <div className={`innerContent ${styles.container}`}>
        {result.map((v) => (
          <ProductCard
            onClick={() => router.push(`/products/${v.id}`)}
            key={v.id}
            id={v.id}
            name={v.name}
            category={v.categoryName}
            price={v.price}
            viewCount={v.viewCount}
            likeCount={v.heartCount}
            commentCount={v.commentCount}
          />
        ))}
        <div ref={lastItemRef} className={styles.loading}>
          {loading && <p>로드중</p>}
        </div>
      </div>
      {search && createPortal(searchOverlay, document.body)}
    </>
  );
}

interface FilterListProps {
  query: string;
  brand?: string;
  delivery: boolean;
  status?: 'SELL' | 'RESERVE' | 'COMP';
  category: string[];
}

function FilterList({
  query,
  category: initialCategory,
  delivery: initialDelivery,
  status: initialStatus,
  brand: initialBrand,
}: FilterListProps) {
  const router = useRouter();

  const [category, setCategory] = useState<string[]>(initialCategory);
  const [delivery, setDelivery] = useState<boolean>(initialDelivery);
  const [brand, setBrand] = useState<string | undefined>(initialBrand);
  const [status, setStatus] = useState<'SELL' | 'RESERVE' | 'COMP' | undefined>(initialStatus);

  // load
  const [filters, setFilters] = useState<FilterResponse>();
  useEffect(() => {
    (async () => {
      const res = await getFilters();
      if (res === undefined) return;
      setFilters(res);
    })();
    return () => {
      setFilters(undefined);
    };
  }, []);

  const lastCategory =
    category.length === 0
      ? filters?.categoryFilter.filter((v) => v.parentId === null).map((v) => v.name)
      : filters?.categoryFilter
          .filter((v) => v.parentName === category[category.length - 1])
          .map((v) => v.name);

  return (
    <div className={styles.filterBar}>
      <div className={styles.filters}>
        <FilterButton
          options={['판매중', '예약됨', '판매완료']}
          label="상태"
          onSelect={(option) => {
            switch (option) {
              case '판매중':
                return setStatus('SELL');
              case '예약됨':
                return setStatus('RESERVE');
              case '판매완료':
                return setStatus('COMP');
            }
            setStatus(undefined);
          }}
        />
        <FilterButton
          options={filters?.brandFilter.map((v) => v.name)}
          label={brand ?? '브랜드'}
          onSelect={(option) => {
            setBrand(option);
          }}
        />
        {category.map((v, i) => {
          return (
            <FilterButton
              key={`category-${i}`}
              options={
                i === 0
                  ? filters?.categoryFilter.filter((v) => v.parentId === null).map((v) => v.name)
                  : filters?.categoryFilter
                      .filter((v) => v.parentName === category[i - 1])
                      .map((v) => v.name)
              }
              label={category[i]}
              onSelect={(option) => {
                if (option === undefined) return;
                setCategory((state) => [...state.slice(0, i), option]);
              }}
            />
          );
        })}
        {lastCategory?.length !== 0 && (
          <FilterButton
            key={`category-${category.length - 1}`}
            options={lastCategory}
            label="카테고리"
            onSelect={(option) => {
              if (option === undefined) return;
              setCategory([...category, option]);
            }}
          />
        )}
        <IconButton
          label="택배"
          styleType={delivery ? 'secondary' : 'none'}
          onClick={() => setDelivery((state) => !state)}
        />
      </div>
      <IconButton
        label="적용"
        styleType="primary"
        onClick={() =>
          router.push(
            `/search?q=${query}&delivery=${delivery}${category
              .map((v, i) => `&category${i}=${v}`)
              .reduce((p, v) => p + v)}${brand ? `&brand=${brand}` : ''}${
              status ? `&status=${status}` : ''
            }`,
          )
        }
      />
    </div>
  );
}
