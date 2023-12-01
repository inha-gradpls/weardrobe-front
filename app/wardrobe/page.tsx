'use client';
import TopBar from '@/components/TopBar';
import styles from './page.module.css';
import Image from 'next/image';
import { getWardrobeData } from '@/utils/api';
import { Dispatch, HTMLAttributes, SetStateAction, useEffect, useState } from 'react';
import IconButton from '@/components/Button/IconButton';

export default function WardrobePage() {
  const [data, setData] = useState<WardrobeData>();
  const [types, setTypes] = useState<string[]>([]);

  const [user, setUser] = useState<string>();
  const [cloth, setCloth] = useState<string>();

  useEffect(() => {
    (async () => {
      const res = await getWardrobeData();
      if (res === undefined) return;
      setData(res);
      // find types
      const newTypes = new Set<string>();
      for (const c of res.wardrobeCloth) {
        newTypes.add(c.category);
      }
      setTypes(Array.from(newTypes));
    })();
  }, []);
  return (
    <>
      <TopBar backButton={false}>
        <h3>옷장</h3>
      </TopBar>
      {data && (
        <div className={`innerContent ${styles.container}`}>
          <div className={styles.resultContainer}>
            <Image
              src={'/example.png'}
              alt="viton result"
              width={0}
              height={0}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
          <form className={styles.carouselContainer}>
            <Carousel
              selected={user}
              setSelected={setUser}
              category="사람"
              items={data.wardrobeUser}
            />
            {types.map((v) => {
              return (
                <Carousel
                  selected={cloth}
                  setSelected={setCloth}
                  key={v}
                  category={v}
                  items={data.wardrobeCloth.filter((d) => d.category === v)}
                />
              );
            })}
          </form>
          <div className={styles.bottom}>
            <IconButton
              label="이미지 생성"
              styleType="primary"
              icon="auto_awesome"
              onClick={() => {
                //todo: implement this
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

interface CarouselProps {
  category: string;
  items: UserItem[] | ClothItem[];
  selected: string | undefined;
  setSelected: Dispatch<SetStateAction<string | undefined>>;
}

function Carousel({ selected, setSelected, category, items }: CarouselProps) {
  return (
    <div className={styles.carousel}>
      <p>{category}</p>
      <div className={styles.carouselItems}>
        {items.map((v) => {
          const image = getImageFromItem(v);
          return (
            <CarouselItem
              key={v.id}
              image={image}
              onClick={() => setSelected(image)}
              selected={image === selected}
            />
          );
        })}
      </div>
    </div>
  );
}

interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  image: string;
  selected: boolean;
}

function CarouselItem({ image, selected, ...props }: CarouselItemProps) {
  return (
    <div className={`${styles.carouselItem} ${selected && styles.selected}`} {...props}>
      <Image src={image} alt={''} width={100} height={100} style={{ objectFit: 'fill' }} />
    </div>
  );
}

function getImageFromItem(item: UserItem | ClothItem) {
  return (item as UserItem).wardrobeUserImage || (item as ClothItem).wardrobeClothImage;
}
