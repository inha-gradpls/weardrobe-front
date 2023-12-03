'use client';
import { NEED_LOGIN } from '@/utils/http';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginEventHandler() {
  const router = useRouter();

  useEffect(() => {
    const handler = () => {
      router.push('/login');
    };
    document.addEventListener(NEED_LOGIN, handler);
    return () => document.removeEventListener(NEED_LOGIN, handler);
  }, [router]);

  return <></>;
}
