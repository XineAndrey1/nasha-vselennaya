'use client';

import dynamic from 'next/dynamic';
import styles from './page.module.scss';

const Map = dynamic(() => import('@/components/Map/Map'), {
  ssr: false,
  loading: () => (
    <div className={styles.loader}>
      <p>🌹 Загружаем нашу вселенную...</p>
      <div className={styles.spinner} />
    </div>
  ),
});

export default function Home() {
  return (
    <main className={styles.main}>
      <Map />
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <h1>Наша Вселенная</h1>
          <div className={styles.subtitle}>наша история любви</div>
        </div>
        <div className={styles.hint}>❤️ коснись сердечка, чтобы вспомнить</div>
      </div>
    </main>
  );
}