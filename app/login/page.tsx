'use client';
import styles from './page.module.css';
import { useUser } from '@/states/user';
import { API_BASE_URL } from '@/utils/api';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function LoginPage() {
  const router = useRouter();
  const reset = useUser((state) => state.reset);
  useEffect(() => {
    reset();
  }, [reset]);
  return (
    <>
      <div className={styles.container}>
        <Link href={`${API_BASE_URL}/oauth2/authorization/kakao`}>
          <Image
            src={'/kakao_login.png'}
            alt="카카오 로그인"
            width={0}
            height={40}
            sizes="100vw"
            style={{
              width: '100%',
              objectFit: 'contain',
            }}
          />
        </Link>
      </div>
    </>
  );
}
