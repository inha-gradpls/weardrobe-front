'use client';
import { useUser } from '@/states/user';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { getProductInfo, getUserInfo, updateFavorite } from '@/utils/api';
import TopBar from '@/components/TopBar';
import Image from 'next/image';
import IconButton from '@/components/Button/IconButton';
import 'material-symbols';
import { getImageUrl, tsToDeltaStr } from '@/utils/uiHelper';
import UserCard from '@/components/UserCard';
import { createPortal } from 'react-dom';
import CommentsOverlay from '@/components/CommentsOverlay';

interface ProductDetailPageProps {
  params: { productId: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const productId = parseInt(params.productId) ?? -1;
  const [productInfo, setProductInfo] = useState<ProductInfo | undefined>();
  const [favorite, setFavorite] = useState<boolean>(false);
  const [comments, setComments] = useState<boolean>(false);

  const { userInfo, setUserInfo } = useUser((state) => ({
    userInfo: state.userInfo,
    setUserInfo: state.setUserInfo,
  }));

  // fetch user info
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const res = await getUserInfo(undefined, controller.signal);
      if (res === undefined) return;
      setUserInfo(res);
    })();
    return () => controller.abort();
  }, [setUserInfo]);

  // fetch product info
  useEffect(() => {
    if (productId === -1) return;
    const controller = new AbortController();
    (async () => {
      const res = await getProductInfo(productId, controller.signal);
      setProductInfo(res);
      setFavorite(res?.favorite ?? false);
    })();
    return () => {
      controller.abort();
    };
  }, [productId]);

  // setFavorite
  const setFavoriteApi = (state: boolean) => {
    (async () => {
      const res = await updateFavorite(productId, state);
      if (!res) return;
      setFavorite(state);
    })();
  };

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
                quality={100}
                src={getImageUrl(productInfo.productImage)}
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
                <p>{tsToDeltaStr(productInfo.createdDate)}</p>
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
          <div className={styles.bottomBar}>
            <p className={styles.price}>{`${productInfo.price} 원`}</p>
            <IconButton
              onClick={() => setFavoriteApi(!favorite)}
              label="찜"
              styleType={favorite ? 'secondary' : 'none'}
            />
            <IconButton onClick={() => setComments(true)} label="댓글" styleType="primary" />
          </div>
        </>
      )}
      {comments &&
        createPortal(
          <CommentsOverlay id={productId} onClose={() => setComments(false)} isSeller={isSeller} />,
          document.body,
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
