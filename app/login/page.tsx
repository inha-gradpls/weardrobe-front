'use client';
import styles from './page.module.css';
import IconButton from '@/components/Button/IconButton';
import { useUser } from '@/states/user';
import { API_BASE_URL } from '@/utils/api';
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
        <IconButton
          onClick={() => router.push(`${API_BASE_URL}/oauth2/authorization/kakao`)}
          label="카카오 로그인"
          icon="login"
        />
      </div>
    </>
  );
}
