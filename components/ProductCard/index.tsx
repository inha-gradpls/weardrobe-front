'use client';
import Image from 'next/image';
import styles from './productCard.module.css';
import { BLUR_URL } from '@/utils/api';
import { getImageUrl, statusToStr } from '@/utils/uiHelper';
interface ProductCardProps {
  id: number;
  img?: string;
  name: string;
  category: string;
  price: number;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  status?: ProductState;
  onClick?: () => void;
}
export default function ProductCard({
  id,
  img,
  name,
  category,
  price,
  viewCount,
  likeCount,
  commentCount,
  onClick,
  status,
}: ProductCardProps) {
  return (
    <div className={styles.container} onClick={onClick}>
      <Image
        className={styles.thumb}
        src={getImageUrl(img)}
        alt={'product thumbnail'}
        blurDataURL={BLUR_URL}
        placeholder="blur"
        width={79}
        height={79}
      />
      <div className={styles.content}>
        <p className={styles.name}>{name}</p>
        <p className={styles.price}>{`${price} 원`}</p>
        <p className={styles.category}>{category}</p>
        <div className={styles.statisticContainer}>
          <span className={`material-symbols-outlined ${styles.icon}`}>visibility</span>
          <p>{viewCount}</p>
          <span className={`material-symbols-outlined ${styles.icon}`}>favorite</span>
          <p>{likeCount}</p>
          <span className={`material-symbols-outlined ${styles.icon}`}>sms</span>
          <p>{commentCount}</p>
          <p>{statusToStr(status)}</p>
        </div>
      </div>
    </div>
  );
}
