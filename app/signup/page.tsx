'use client';
import TopBar from '@/components/TopBar';
import styles from './page.module.css';
import Input from '@/components/Input';
import FilterButton from '@/components/Button/FilterButton';
import { useEffect, useState } from 'react';
import IconButton from '@/components/Button/IconButton';
import { signUp } from '@/utils/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/states/user';

export default function SignupPage() {
  const [gender, setGender] = useState<'M' | 'F'>();
  const router = useRouter();
  const params = useSearchParams();

  const access = params.get('accessToken');
  const refresh = params.get('refreshToken');

  const { setAccessToken, setRefreshToken } = useUser((state) => ({
    setAccessToken: state.setAccessToken,
    setRefreshToken: state.setRefreshToken,
  }));

  // access
  useEffect(() => {
    if (access) setAccessToken(`Bearer ${access}`);
    if (refresh) {
      setRefreshToken(`Bearer ${refresh}`);
      router.push('/');
    }
  }, [access, refresh, router, setAccessToken, setRefreshToken]);

  if (refresh) return <></>;

  return (
    <>
      <TopBar backButton={false}>
        <h3>회원가입</h3>
      </TopBar>
      <form
        className={`innerContent ${styles.container}`}
        onSubmit={(e) => {
          e.preventDefault();
          // read form data to json
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const json = Object.fromEntries(formData.entries());

          // create data
          const data: SignUpFormData = {
            name: json.name as string,
            nickname: json.nickname as string,
            age: parseInt(json.age as string),
            gender: json.gender as 'M' | 'F',
            phoneNumber: json.phoneNumber as string,
          };

          console.log(json);
          // simple validation
          if (!data.gender || !data.name || !data.phoneNumber || !data.age || !data.nickname) {
            alert('내용을 확인해 주세요');
            return;
          }

          // request
          const res = signUp(data);
          if (res === undefined) {
            alert('실패');
            return;
          }

          // success
          // TODO: should request refresh token?
          router.push('/');
        }}
      >
        <p>성명</p>
        <Input name="name" />
        <p>닉네임</p>
        <Input name="nickname" />
        <p>나이</p>
        <Input name="age" type="number" />
        <p>성별</p>
        <FilterButton
          label={'성별'}
          onSelect={(option) => {
            if (option === undefined) return;
            if (option !== 'M' && option !== 'F') return;
            setGender(option);
          }}
          options={['M', 'F']}
        />
        <input type="hidden" name="gender" defaultValue={gender} />
        <p>전화번호</p>
        <Input name="phoneNumber" type="number" />
        <div className={styles.submit}>
          <IconButton label="회원가입" styleType="primary" type="submit" />
        </div>
      </form>
    </>
  );
}
