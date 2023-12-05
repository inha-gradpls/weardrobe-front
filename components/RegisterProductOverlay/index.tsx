'use client';
import styles from './registerProductOverlay.module.css';
import BottomModal from '../BottomModal';
import TopBar from '../TopBar';
import IconButton from '../Button/IconButton';
import { getFilters, registerProduct } from '@/utils/api';
import Input from '../Input';
import { useEffect, useState } from 'react';
import FilterButton from '../Button/FilterButton';
import { useRouter } from 'next/navigation';

interface RegisterProductOverlayProps {
  onClose: () => void;
}

export default function RegisterProductOverlay({ onClose }: RegisterProductOverlayProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        // read form data to json
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        // simple validation
        if (
          !formData.get('name') ||
          !formData.get('price') ||
          !formData.get('brandName') ||
          !formData.get('categoryName') ||
          !formData.get('deliveryAvailable') ||
          !formData.get('description') ||
          !formData.get('productImage')
        ) {
          alert('내용을 확인해 주세요');
          setLoading(false);
          return;
        }

        const deliveryAvailable = formData.get('deliveryAvailable')?.toString() ?? '';
        formData.set('deliveryAvailable', deliveryAvailable === '가능' ? 'true' : 'false');

        // request
        (async () => {
          const res = await registerProduct(formData);
          if (res === undefined) {
            alert('실패');
            setLoading(false);
            return;
          }

          // 등록된 상품 페이지로 이동
          router.replace(`/products/${res.id}`);

          setLoading(false);
        })();
      }}
    >
      <BottomModal onClose={onClose} fill={true}>
        <TopBar
          backButton={true}
          onBack={onClose}
          actions={[
            <IconButton
              key={'action_register'}
              icon="check"
              styleType="transparent"
              type="submit"
            />,
          ]}
        >
          <h3 style={{ textAlign: 'center', width: '100%' }}>상품 등록</h3>
        </TopBar>
        <div className={`innerContent ${styles.container}`}>
          {loading && <p>등록중..</p>}
          {!loading && (
            <>
              <p>제품명</p>
              <Input name="name" />
              <p>가격</p>
              <Input name="price" type="number" />
              <p>택배 가능</p>
              <LinearSelector options={['가능', '불가']} name="deliveryAvailable" />
              <CategoryBrandSelector />
              <p>상세 설명</p>
              <Input name="description" type="textArea" />
              <p>제품 이미지</p>
              <Input name="productImage" type="file" accept="image/jpeg" />
            </>
          )}
        </div>
      </BottomModal>
    </form>
  );
}

interface LinearSelectorProps {
  options: string[];
  name: string;
}

function LinearSelector({ options, name }: LinearSelectorProps) {
  const [select, setSelect] = useState<string>();
  return (
    <div className={styles.selector}>
      {options.map((v, i) => {
        return (
          <p
            key={v}
            className={`${styles.item} ${select === v && styles.selected}`}
            onClick={() => setSelect(v)}
          >
            {v}
          </p>
        );
      })}
      <input type="hidden" name={name} defaultValue={select} />
    </div>
  );
}

function CategoryBrandSelector() {
  // load
  const [filters, setFilters] = useState<FilterResponse>();
  const [category, setCategory] = useState<string[]>([]);
  const [brand, setBrand] = useState<string>();

  useEffect(() => {
    (async () => {
      const res = await getFilters();
      if (res === undefined) return;
      setFilters(res);
    })();
    return () => {
      setFilters(undefined);
    };
  }, []);

  const lastCategory =
    category.length === 0
      ? filters?.categoryFilter.filter((v) => v.parentId === null).map((v) => v.name)
      : filters?.categoryFilter
          .filter((v) => v.parentName === category[category.length - 1])
          .map((v) => v.name);

  return (
    <>
      <p>카테고리</p>
      <div className={styles.categories}>
        {category.map((v, i) => {
          return (
            <FilterButton
              key={`category-${i}`}
              options={
                i === 0
                  ? filters?.categoryFilter.filter((v) => v.parentId === null).map((v) => v.name)
                  : filters?.categoryFilter
                      .filter((v) => v.parentName === category[i - 1])
                      .map((v) => v.name)
              }
              label={category[i]}
              onSelect={(option) => {
                if (option === undefined) return;
                setCategory((state) => [...state.slice(0, i), option]);
              }}
            />
          );
        })}
        {lastCategory?.length !== 0 && (
          <FilterButton
            key={`category-${category.length - 1}`}
            options={lastCategory}
            label="카테고리"
            onSelect={(option) => {
              if (option === undefined) return;
              setCategory([...category, option]);
            }}
          />
        )}
        <input
          type="hidden"
          name="categoryName"
          defaultValue={category.length > 1 ? category[1] : undefined}
        />
      </div>
      <p>브랜드명</p>
      <FilterButton
        key={'brand'}
        options={filters?.brandFilter.map((v) => v.name)}
        label="브랜드"
        onSelect={(option) => {
          if (option === undefined) return;
          setBrand(option);
        }}
      />
      <input type="hidden" name="brandName" defaultValue={brand} />
    </>
  );
}
