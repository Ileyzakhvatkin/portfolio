import React from 'react';
import styles from './statistica.css';
import { StatisticaIcon } from '../../IconCompomemts/StatisticaIcon';
import { Link } from 'react-router-dom';

export function Statistica() {
  return (
    <Link to="/statistics/" className={styles.statistica}>
      <StatisticaIcon />
      <span className={styles.statisticaTitle}>Статистика</span>
    </Link>
  );
}
