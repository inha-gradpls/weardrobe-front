import Image from 'next/image';
import styles from './productCardMini.module.css';
import { BLUR_URL } from '@/utils/api';

interface ProductCardMiniProps {
  id: number;
  img?: string;
  name: string;
  price: number;
}

export default function ProductCardMini({ id, img, name, price }: ProductCardMiniProps) {
  return (
    <div className={styles.container}>
      <Image
        className={styles.thumb}
        width={35}
        height={35}
        src={img ?? BLUR_URL}
        alt="thumb"
        blurDataURL={BLUR_URL}
        placeholder="blur"
      />
      <div className={styles.content}>
        <p>{name}</p>
        <p>{`${price} 원`}</p>
      </div>
    </div>
  );
}
