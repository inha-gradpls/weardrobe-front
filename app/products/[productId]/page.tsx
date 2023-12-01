'use client';
import { useUser } from '@/states/user';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { getProductInfo, getUserInfo } from '@/utils/api';
import TopBar from '@/components/TopBar';
import Image from 'next/image';
import IconButton from '@/components/Button/IconButton';
import 'material-symbols';
import { tsToDeltaStr } from '@/utils/uiHelper';
import UserCard from '@/components/UserCard';

interface ProductDetailPageProps {
  params: { productId: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const productId = parseInt(params.productId) ?? -1;
  const [productInfo, setProductInfo] = useState<ProductInfo | undefined>();

  const { userInfo, setUserInfo } = useUser((state) => ({
    userInfo: state.userInfo,
    setUserInfo: state.setUserInfo,
  }));

  // fetch user info
  useEffect(() => {
    (async () => {
      const res = await getUserInfo();
      if (res === undefined) return;
      setUserInfo(res);
    })();
  }, [setUserInfo]);

  // fetch product info
  useEffect(() => {
    (async () => {
      const res = await getProductInfo(productId);
      setProductInfo(res);
    })();
  }, [productId]);

  const isSeller =
    userInfo !== undefined && productInfo !== undefined && userInfo?.id === productInfo?.sellerId;

  return (
    <>
      <TopBar backButton={true} actions={<UserActions isSeller={isSeller} />}>
        <h3>{productInfo?.name}</h3>
      </TopBar>
      {productInfo === undefined ? (
        <></>
      ) : (
        <>
          <div className={`innerContent ${styles.container}`}>
            <div className={styles.photo}>
              <Image
                src={productInfo.productImage}
                alt=""
                width={0}
                height={0}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain',
                }}
              />
            </div>
            <div className={styles.content}>
              <h3>{productInfo.name}</h3>
              <UserCard userId={productInfo.sellerId ?? 0} />
              <div className={styles.infoContainer}>
                <p>{tsToDeltaStr(productInfo.createDate)}</p>
                <span className={`material-symbols-outlined ${styles.infoIcon}`}>visibility</span>
                <p>{productInfo.viewCount}</p>
                <span className={`material-symbols-outlined ${styles.infoIcon}`}>favorite</span>
                <p>{productInfo.heartCount}</p>
                <span className={`material-symbols-outlined ${styles.infoIcon}`}>sms</span>
                <p>{productInfo.commentCount}</p>
              </div>
              <p>{productInfo.description}</p>
            </div>
          </div>
          <BottomBar isSeller={isSeller} productId={productId} price={productInfo.price} />
        </>
      )}
    </>
  );
}

interface UserActionsProps {
  isSeller: boolean;
}

function UserActions({ isSeller }: UserActionsProps) {
  if (!isSeller) return <></>;
  return (
    <>
      <IconButton onClick={() => {}} icon="edit" styleType="transparent" />
      <IconButton onClick={() => {}} icon="delete" styleType="transparent" />
    </>
  );
}

interface BottomBarProps {
  isSeller: boolean;
  productId: number;
  price: number;
}

function BottomBar({ isSeller, productId, price }: BottomBarProps) {
  return (
    <div className={styles.bottomBar}>
      <p className={styles.price}>{`${price} 원`}</p>
      <BottomActions isSeller={isSeller} productId={productId} />
      <IconButton
        onClick={() => {}}
        label={isSeller ? '댓글 목록' : '댓글 달기'}
        styleType="secondary"
      />
    </div>
  );
}

interface BottomActionsProps {
  isSeller: boolean;
  productId: number;
}

function BottomActions({ isSeller, productId }: BottomActionsProps) {
  if (isSeller) {
    return (
      <>
        <IconButton onClick={() => {}} label="판매 완료" />
        <IconButton onClick={() => {}} label="예약" />
      </>
    );
  }

  return (
    <>
      <IconButton onClick={() => {}} label="찜" />
      <IconButton onClick={() => {}} label="가상 피팅" />
    </>
  );
}
