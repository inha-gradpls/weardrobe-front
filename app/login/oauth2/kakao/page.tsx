'use client';
import { kakaoLoginCallback } from '@/utils/api';
import { useRouter, useSearchParams } from 'next/navigation';

export default function KakaoCallbackPage() {
  const params = useSearchParams();
  const router = useRouter();
  const code = params.get('code');
  const state = params.get('state');

  if (code === null || state === null) {
    router.push('/');
    return <></>;
  }

  // send code to server via fetch
  (async () => {
    const needSignup = await kakaoLoginCallback(code, state);
    if (needSignup) router.push('/signup');
    else router.push('/');
  })();

  return <></>;
}
