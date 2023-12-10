'use client';
import TopBar from '@/components/TopBar';
import styles from './page.module.css';
import Image from 'next/image';
import { generateViton, getWardrobeData } from '@/utils/api';
import { Dispatch, HTMLAttributes, SetStateAction, useCallback, useEffect, useState } from 'react';
import IconButton from '@/components/Button/IconButton';
import { getImageUrl } from '@/utils/uiHelper';
import { createPortal } from 'react-dom';
import RegisterImageOverlay from '@/components/RegisterImageOverlay';
import LoadingOverlay from '@/components/LoadingOverlay';

export default function WardrobePage() {
  const [data, setData] = useState<WardrobeData>();

  const [user, setUser] = useState<number>();
  const [cloth, setCloth] = useState<number>();

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>();

  const [upload, setUpload] = useState<boolean>(false);

  const loadWardrobeData = useCallback(async () => {
    const res = await getWardrobeData();
    if (res === undefined) return;
    setData(res);
  }, []);

  useEffect(() => {
    loadWardrobeData();
  }, [loadWardrobeData]);

  const generateResult = async () => {
    if (user === undefined || cloth === undefined) {
      alert('함성할 인물과 상품을 선택해 주세요!');
      setLoading(false);
      return;
    }
    const res = await generateViton({
      wardrobeUserId: user,
      favoriteProductId: cloth,
    });
    if (res === undefined) return;
    setResult(res.vitonImage);
    setLoading(false);
  };

  return (
    <>
      <TopBar backButton={false}>
        <h3>옷장</h3>
      </TopBar>
      {data && (
        <div className={`innerContent ${styles.container}`}>
          <div className={styles.resultContainer}>
            <Image
              src={getImageUrl(result)}
              alt="viton result"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
            {loading && <p className={styles.name}>로드중</p>}
          </div>
          <div className={styles.carouselContainer}>
            <Carousel
              selected={user}
              setSelected={setUser}
              category="인물"
              items={data.wardrobeUser}
              onAdd={() => setUpload(true)}
            />
            <Carousel
              wrap={true}
              selected={cloth}
              setSelected={setCloth}
              category="찜한 상품"
              items={data.favoriteProduct}
            />
          </div>
          <div className={styles.bottom}>
            <IconButton
              label="이미지 생성"
              styleType={loading ? 'none' : 'primary'}
              icon="auto_awesome"
              onClick={() => {
                if (loading) return;
                setLoading(true);
                generateResult();
              }}
            />
          </div>
        </div>
      )}
      {upload &&
        createPortal(
          <RegisterImageOverlay
            onClose={(res) => {
              if (res) {
                loadWardrobeData();
              }
              setUpload(false);
            }}
          />,
          document.body,
        )}
      {loading && createPortal(<LoadingOverlay text={'이미지를 생성중입니다..'} />, document.body)}
    </>
  );
}

interface CarouselProps {
  category: string;
  items: UserItem[] | ClothItem[];
  selected: number | undefined;
  wrap?: boolean;
  onAdd?: () => void;
  setSelected: Dispatch<SetStateAction<number | undefined>>;
}

function Carousel({ selected, setSelected, category, items, wrap = false, onAdd }: CarouselProps) {
  return (
    <div className={styles.carousel}>
      <div className={styles.carouselHeader}>
        <p>{category}</p>
        {onAdd && <IconButton onClick={onAdd} label="추가" />}
      </div>

      <div className={`${styles.carouselItems} ${wrap && styles.wrap}`}>
        {items.map((v) => {
          const image = getImageFromItem(v);
          return (
            <CarouselItem
              key={v.id}
              image={image}
              name={(v as ClothItem).name}
              onClick={() => setSelected(v.id)}
              selected={v.id === selected}
            />
          );
        })}
      </div>
    </div>
  );
}

interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  image: string;
  selected: boolean;
}

function CarouselItem({ image, selected, name, ...props }: CarouselItemProps) {
  return (
    <div className={`${styles.carouselItem} ${selected && styles.selected}`} {...props}>
      <Image
        src={getImageUrl(image)}
        alt={''}
        width={100}
        height={100}
        style={{ objectFit: 'fill' }}
      />
      {name && <p className={styles.name}>{name}</p>}
    </div>
  );
}

function getImageFromItem(item: UserItem | ClothItem) {
  return (item as UserItem).userImage || (item as ClothItem).productImage;
}
