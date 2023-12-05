import Image from 'next/image';
import styles from './userCard.module.css';
import { useEffect, useState } from 'react';
import { getUserInfo } from '@/utils/api';
import Link from 'next/link';
import { getImageUrl } from '@/utils/uiHelper';

interface UserCardProps {
  userId: number;
  nickname?: string;
  profilePic?: string;
  large?: boolean;
}

export default function UserCard({ userId, nickname, profilePic, large = false }: UserCardProps) {
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
      });
    }
  }, [nickname, profilePic, userId]);

  if (data === undefined) return <></>;

  const imgSize = large ? 70 : 26;

  return (
    <Link href={`/users/${userId}`}>
      <div className={`${styles.container} ${large && styles.largeText}`}>
        <div className={`${styles.photo} ${large && styles.large}`}>
          <Image
            src={getImageUrl(data.imageUrl)}
            alt={'profile picture'}
            width={imgSize}
            height={imgSize}
            style={{ objectFit: 'fill' }}
          />
        </div>
        @{data.nickname}
      </div>
    </Link>
  );
}
