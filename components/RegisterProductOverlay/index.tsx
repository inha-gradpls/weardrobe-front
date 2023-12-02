'use client';
import styles from './registerProductOverlay.module.css';
import BottomModal from '../BottomModal';
import TopBar from '../TopBar';
import IconButton from '../Button/IconButton';
import { getFilters, registerProduct } from '@/utils/api';
import Input from '../Input';
import { useSearch } from '../SearchOverlay';
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
        // read form data to json
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const json = Object.fromEntries(formData.entries());

        // create data
        const data: ProductFormData = {
          name: json.name as string,
          deliveryAvailable: (json.deliverAvailable as string) === '가능',
          price: parseInt(json.price as string),
          description: json.description as string,
          categoryName: json.categoryName as string,
          brandName: json.brandName as string,
          productImage: json.productImage as File,
        };

        // simple validation
        for (const [k, v] of Object.entries(data)) {
          if (isNaN(v) || v === '' || v === undefined || v === null) {
            alert('내용을 확인해 주세요');
            return;
          }
        }

        // request
        (async () => {
          const res = await registerProduct(data);
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
          <p>제품명</p>
          <Input name="name" />
          <p>가격</p>
          <Input name="price" type="number" />
          <p>택배 가능</p>
          <LinearSelector options={['가능', '불가']} name="deliveryAvailable" />
          <p>카테고리</p>
          <CategorySelector name="categoryName" />
          <p>브랜드명</p>
          <Input name="brandName" />
          <p>상세 설명</p>
          <Input name="description" type="textArea" />
          <p>제품 이미지</p>
          <Input name="productImage" type="file" accept="image/png" />
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

interface CategorySelectorProps {
  name: string;
}

function CategorySelector({ name }: CategorySelectorProps) {
  // load
  const [filters, setFilters] = useState<FilterResponse>();
  const [category, setCategory] = useState<string[]>([]);

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
        name={name}
        defaultValue={category.length > 0 ? category[category.length - 1] : undefined}
      />
    </div>
  );
}
