import Image from 'next/image';
import styles from './userCard.module.css';
import { useEffect, useState } from 'react';
import { getUserInfo } from '@/utils/api';
import Link from 'next/link';

interface UserCardProps {
  userId: number;
  nickname?: string;
  profilePic?: string;
}

export default function UserCard({ userId, nickname, profilePic }: UserCardProps) {
  const [data, setData] = useState<UserInfo>();

  useEffect(() => {
    if (nickname === undefined || profilePic === undefined) {
      // fetch user info
      (async () => {
        const res = await getUserInfo(userId);
        setData(res);
      })();
    } else {
      // use supplied info
      setData({
        id: userId,
        nickname: nickname,
        imageUrl: profilePic,
        reliableScore: -1,
      });
    }
  }, [nickname, profilePic, userId]);

  if (data === undefined) return <></>;

  return (
    <Link href={`/users/${userId}`}>
      <div className={styles.container}>
        <div className={styles.photo}>
          <Image
            src={data.imageUrl}
            alt={'profile picture'}
            width={26}
            height={26}
            style={{ objectFit: 'fill' }}
          />
        </div>
        {data.nickname}
      </div>
    </Link>
  );
}
