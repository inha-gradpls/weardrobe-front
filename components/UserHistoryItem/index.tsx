import { dateToStr, getImageUrl } from '@/utils/uiHelper';
import styles from './userHistoryItem.module.css';
import ProductCardMini from '../ProductCard/ProductCardMini';

interface UserHistoryItemProps {
  date: string;
  type: UserHistoryType;
  id: number;
  name: string;
  price: number;
  img: string;
}

export default function UserHistoryItem({
  date,
  type,
  id,
  name,
  price,
  img,
}: UserHistoryItemProps) {
  return (
    <div className={styles.container}>
      <p className={styles.date}>{dateToStr(date)}</p>
      <div className={styles.innerContainer}>
        <p className={styles.badge}>{typeToStr(type)}</p>
        <ProductCardMini id={id} name={name} price={price} img={getImageUrl(img)} />
      </div>
    </div>
  );
}

function typeToStr(type: UserHistoryType) {
  switch (type) {
    case 'sell':
      return '판매';
    case 'buy':
      return '구매';
    case 'favorite':
      return '찜';
  }
}
