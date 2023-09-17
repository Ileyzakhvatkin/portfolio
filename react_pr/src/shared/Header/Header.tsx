import React from 'react';
import styles from './header.css';
import { Logo } from './Logo';
import { Statistica } from './Statistica';

export function Header() {
  return (
    <div className={'header' + ' ' + styles.header}>
      <div className={styles.headerContainer}>
        <Logo/>
        <Statistica/>
      </div>
    </div>
  );
}
