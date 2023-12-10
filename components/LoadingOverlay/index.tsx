import styles from './loadingOverlay.module.css';

interface LoadingOverlayProps {
  text: string;
}

export default function LoadingOverlay({ text }: LoadingOverlayProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
}
