'use client';
import { lipsum } from '@/utils/api';
import styles from './overlayWrapper.module.css';
import { useOverlay } from '@/states/overlay';
export default function OverlayWrapper() {
  const overlay = useOverlay((state) => state.overlay);
  if (overlay === undefined) return <></>;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>{lipsum}</p>
      </div>
    </div>
  );
}
