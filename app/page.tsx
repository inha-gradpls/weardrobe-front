'use client';
import TopBar from '@/components/TopBar';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { getHomeFeed } from '@/utils/api';
import ProductCard from '@/components/ProductCard';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  useEffect(() => {
    const job = async () => {
      const newProducts = await getHomeFeed();
      setProducts(newProducts);
    };
    job();
  }, [setProducts]);

  return (
    <>
      <TopBar backButton={false}>
        <h3>메인화면</h3>
      </TopBar>
      <div className={styles.container}>
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
