'use client';
import styles from './page.module.css';
import IconButton from '@/components/Button/IconButton';
import { useRouter } from 'next/navigation';
export default function LoginPage() {
  const router = useRouter();
  return (
    <>
      <div className={styles.container}>
        <IconButton
          onClick={() => router.push('/oauth2/authorization/kakao')}
          label="카카오 로그인"
          icon="login"
        />
      </div>
    </>
  );
}
