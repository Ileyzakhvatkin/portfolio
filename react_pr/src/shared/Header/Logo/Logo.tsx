import React from 'react';
import styles from './logo.css';
import { LogoIcon } from '../../IconCompomemts/LogoIcon';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <LogoIcon />
      <span className={styles.logoTitle}>pomodoro_box</span>
    </Link>
  );
}
