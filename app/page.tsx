'use client';
import TopBar from '@/components/TopBar';
import styles from './page.module.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getHomeFeed } from '@/utils/api';
import ProductCard from '@/components/ProductCard';
import { useRouter } from 'next/navigation';
import IconButton from '@/components/Button/IconButton';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [order, setOrder] = useState<ProductOrder>('createdDate');
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const newProducts = await getHomeFeed(order);
      setProducts(newProducts);
    })();
  }, [order, setProducts]);

  return (
    <>
      <TopBar backButton={false} footer={<OrderSelection order={order} setOrder={setOrder} />}>
        <h3>메인화면</h3>
      </TopBar>
      <div className="innerContent">
        <div className={styles.products}>
          {products.map((v) => (
            <ProductCard
              key={v.id}
              id={v.id}
              name={v.name}
              category={v.categoryId.toString()}
              price={v.price}
              viewCount={v.viewCount}
              likeCount={0}
              commentCount={0}
              onClick={() => router.push(`/products/${v.id}`)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

interface OrderSelectionProps {
  order: ProductOrder;
  setOrder: Dispatch<SetStateAction<ProductOrder>>;
}

function OrderSelection({ order, setOrder }: OrderSelectionProps) {
  return (
    <div className={styles.OrderContainer}>
      <IconButton
        label="최근"
        onClick={() => setOrder('createdDate')}
        style={order === 'createdDate' ? 'primary' : 'none'}
      />
      <IconButton
        label="가격"
        onClick={() => setOrder('price')}
        style={order === 'price' ? 'primary' : 'none'}
      />
      <IconButton
        label="조회수"
        onClick={() => setOrder('viewCount')}
        style={order === 'viewCount' ? 'primary' : 'none'}
      />
    </div>
  );
}
