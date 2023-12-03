import Image from 'next/image';
import styles from './productCardMini.module.css';
import { BLUR_URL } from '@/utils/api';
import { getImageUrl } from '@/utils/uiHelper';
import Link from 'next/link';

interface ProductCardMiniProps {
  id: number;
  img?: string;
  name: string;
  price: number;
}

export default function ProductCardMini({ id, img, name, price }: ProductCardMiniProps) {
  return (
    <Link className={styles.container} href={`/products/${id}`}>
      <Image
        className={styles.thumb}
        width={35}
        height={35}
        src={getImageUrl(img)}
        alt="thumb"
        blurDataURL={BLUR_URL}
        placeholder="blur"
      />
      <div className={styles.content}>
        <p>{name}</p>
        <p>{`${price} 원`}</p>
      </div>
    </Link>
  );
}
