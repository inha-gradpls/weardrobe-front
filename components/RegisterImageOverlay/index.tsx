'use client';
import styles from './registerImageOverlay.module.css';
import BottomModal from '../BottomModal';
import TopBar from '../TopBar';
import IconButton from '../Button/IconButton';
import { registerProduct, registerWardrobeImage } from '@/utils/api';
import Input from '../Input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface RegisterImageOverlayProps {
  onClose: (res?: RegisterImageResponse) => void;
}

export default function RegisterImageOverlay({ onClose }: RegisterImageOverlayProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        // read form data to json
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        // simple validation
        if (!formData.get('image')) {
          alert('내용을 확인해 주세요');
          setLoading(false);
          return;
        }

        // request
        (async () => {
          const res = await registerWardrobeImage(formData);
          if (res === undefined) {
            alert('실패');
            setLoading(false);
            return;
          }

          onClose(res);
          setLoading(false);
        })();
      }}
    >
      <BottomModal onClose={onClose} fill={true}>
        <TopBar
          backButton={true}
          onBack={onClose}
          actions={[
            <IconButton
              key={'action_register'}
              icon="check"
              styleType="transparent"
              type="submit"
            />,
          ]}
        >
          <h3 style={{ textAlign: 'center', width: '100%' }}>인물 사진 등록</h3>
        </TopBar>
        <div className={`innerContent ${styles.container}`}>
          {loading && <p>등록중..</p>}
          {!loading && (
            <>
              <p>이미지</p>
              <Input name="image" type="file" accept="image/jpeg" />
              <input type="hidden" defaultValue="user" name="type" />
            </>
          )}
        </div>
      </BottomModal>
    </form>
  );
}
