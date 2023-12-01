'use client';
import styles from './page.module.css';
import TopBar from '@/components/TopBar';
import UserCard from '@/components/UserCard';
import { getUserInfo } from '@/utils/api';
import { dateToStr } from '@/utils/uiHelper';
import { useEffect, useState } from 'react';

interface UserPageProps {
  params: { userId: string };
}

export default function UserPage({ params }: UserPageProps) {
  const userId = parseInt(params.userId) || 0;

  const [data, setData] = useState<UserInfo>();
  useEffect(() => {
    (async () => {
      const res = await getUserInfo(userId);
      if (res === undefined) return;
      setData(res);
    })();
  }, [userId]);

  return (
    <>
      <TopBar backButton={true}>
        <h3>{data?.nickname}</h3>
      </TopBar>
      <div className={`innerContent ${styles.container}`}>
        {data && (
          <>
            <UserCard
              large={true}
              userId={data?.id}
              nickname={data?.nickname}
              profilePic={data?.imageUrl}
            />
            <div className={styles.content}>
              <p className={styles.label}>닉네임</p>
              <p className={styles.text}>{data.nickname}</p>
              <p className={styles.label}>가입일</p>
              <p className={styles.text}>{dateToStr(data.createdDate ?? '')}</p>
              <p className={styles.label}>평점</p>
              <p className={styles.text}>{data.reliableScore}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
