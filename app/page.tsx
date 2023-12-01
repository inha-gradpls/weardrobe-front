'use client';
import TopBar from '@/components/TopBar';
import styles from './page.module.css';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { getHomeFeed } from '@/utils/api';
import ProductCard from '@/components/ProductCard';
import { useRouter } from 'next/navigation';
import IconButton from '@/components/Button/IconButton';
import { useSearch } from '../components/SearchOverlay';
import { createPortal } from 'react-dom';
import RegisterProductOverlay from '@/components/RegisterProductOverlay';

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

  const { search, setSearch, searchOverlay } = useSearch();
  const [register, setRegister] = useState<boolean>(false);

  const searchActionButton = useMemo(
    () => (
      <IconButton
        key="topbar-search"
        onClick={() => setSearch(true)}
        icon="search"
        styleType="transparent"
      />
    ),
    [setSearch],
  );

  return (
    <>
      <TopBar
        backButton={false}
        actions={[searchActionButton]}
        footer={<OrderSelection order={order} setOrder={setOrder} />}
      >
        <h3>메인화면</h3>
      </TopBar>
      <div className={`innerContent ${styles.container}`}>
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
        <div className={styles.floatingButton}>
          <IconButton
            label="상품 등록"
            icon="add"
            styleType="primary"
            onClick={() => setRegister(true)}
          />
        </div>
      </div>
      {search && createPortal(searchOverlay, document.body)}
      {register &&
        createPortal(<RegisterProductOverlay onClose={() => setRegister(false)} />, document.body)}
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
        styleType={order === 'createdDate' ? 'primary' : 'none'}
      />
      <IconButton
        label="가격"
        onClick={() => setOrder('price')}
        styleType={order === 'price' ? 'primary' : 'none'}
      />
      <IconButton
        label="조회수"
        onClick={() => setOrder('viewCount')}
        styleType={order === 'viewCount' ? 'primary' : 'none'}
      />
    </div>
  );
}
