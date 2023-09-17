import React from 'react';
import styles from './mainpage.css';
import { LeftBar } from './LeftBar';
import { Timer } from './Timer';

export function MainPage() {
  return (
    <div className={styles.main}>
      <LeftBar/>
      <Timer/>
    </div>
  );
}
