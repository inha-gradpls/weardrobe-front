'use client';
import TopBar from '@/components/TopBar';
import styles from './page.module.css';
import UserCard from '@/components/UserCard';
import { useUser } from '@/states/user';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { getMyHistory, getMyProducts, getUserInfo } from '@/utils/api';
import { dateToStr, useInfiniteScroll } from '@/utils/uiHelper';
import ProductCard from '@/components/ProductCard';
import UserHistoryItem from '@/components/UserHistoryItem';
import IconButton from '@/components/Button/IconButton';
import { useRouter } from 'next/navigation';
export default function MyPage() {
  const { userInfo, setUserInfo } = useUser((state) => ({
    userInfo: state.userInfo,
    setUserInfo: state.setUserInfo,
  }));

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      const res = await getUserInfo(undefined, controller.signal);
      if (res === undefined) return;
      setUserInfo(res);
    })();
    return () => controller.abort();
  }, [setUserInfo]);

  return (
    <>
      <TopBar backButton={false}>
        <h3>마이페이지</h3>
      </TopBar>
      <div className={`innerContent ${styles.container}`}>
        {userInfo && (
          <>
            <UserCard
              userId={userInfo.id}
              nickname={userInfo.nickname}
              profilePic={userInfo.imageUrl}
              large={true}
            />
            <Tab labels={['프로필', '내 상품', '활동']}>
              <ProfileTab nickname={userInfo.nickname} createdDate={userInfo.createdDate} />
              <ProductsTab />
              <HistoryTab />
            </Tab>
          </>
        )}
      </div>
    </>
  );
}

interface TabProps {
  children: ReactNode[];
  labels: string[];
}

function Tab({ children, labels }: TabProps) {
  const [index, setIndex] = useState<number>(0);
  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabHeader}>
        {labels.map((v, i) => {
          return (
            <p
              key={v}
              className={`${styles.headerItem} ${i === index && styles.activeHeader}`}
              onClick={() => setIndex(i)}
            >
              {v}
            </p>
          );
        })}
      </div>
      <div className={styles.tabContent}>{children[index]}</div>
    </div>
  );
}

interface ProfileTabProps {
  nickname: string;
  createdDate?: string;
}

function ProfileTab({ nickname, createdDate }: ProfileTabProps) {
  return (
    <>
      <p className={styles.label}>닉네임</p>
      <p className={styles.text}>{nickname}</p>
      <p className={styles.label}>가입일</p>
      <p className={styles.text}>{dateToStr(createdDate ?? '')}</p>
    </>
  );
}

function ProductsTab() {
  const lastItemRef = useRef<HTMLDivElement>(null);
  const getData = useCallback(async (page: number, pageSize: number) => {
    return await getMyProducts(page);
  }, []);
  const { result, loading } = useInfiniteScroll<ProductInfo>(getData, 10, lastItemRef);
  const router = useRouter();
  return (
    <>
      {result.map((v) => (
        <ProductCard
          key={v.id}
          id={v.id}
          name={v.name}
          category={v.categoryName}
          img={v.productImage}
          price={v.price}
          viewCount={v.viewCount}
          likeCount={v.heartCount}
          commentCount={v.commentCount}
          onClick={() => router.push(`/products/${v.id}`)}
        />
      ))}
      <div ref={lastItemRef} className={styles.loading}>
        {loading && <p>로드중</p>}
      </div>
    </>
  );
}

function HistoryTab() {
  const lastItemRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<'all' | 'sell' | 'buy' | 'favorite'>('all');
  const getData = useCallback(
    async (page: number, pageSize: number) => {
      return await getMyHistory(page, filter);
    },
    [filter],
  );
  const { result, loading } = useInfiniteScroll<UserHistory>(getData, 10, lastItemRef);
  return (
    <>
      <div className={styles.filterContainer}>
        <IconButton
          label="전체"
          onClick={() => setFilter('all')}
          styleType={filter === 'all' ? 'primary' : 'none'}
        />
        <IconButton
          label="판매"
          onClick={() => setFilter('sell')}
          styleType={filter === 'sell' ? 'primary' : 'none'}
        />
        <IconButton
          label="구매"
          onClick={() => setFilter('buy')}
          styleType={filter === 'buy' ? 'primary' : 'none'}
        />
        <IconButton
          label="찜"
          onClick={() => setFilter('favorite')}
          styleType={filter === 'favorite' ? 'primary' : 'none'}
        />
      </div>
      {result.map((v) => (
        <UserHistoryItem
          key={`${v.history}-${v.id}`}
          date={v.createdDate}
          type={v.history}
          id={v.id}
          name={v.name}
          price={v.price}
          img={v.productImage}
        />
      ))}
      <div ref={lastItemRef} className={styles.loading}>
        {loading && <p>로드중</p>}
      </div>
    </>
  );
}
