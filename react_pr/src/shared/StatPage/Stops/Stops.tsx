import React from 'react';
import styles from './stops.css';
import { PauseIcon } from '../../IconCompomemts/PauseIcon';
import { EColor } from '../../Utils/enums';

interface IProps {
  stopsCount: number;
}

export function Stops({stopsCount }: IProps) {

  return (
    <div className={stopsCount > 0 ? styles.color : styles.stopes}>
      <div className={styles.info}>
        <h2 className={styles.title}>Остановки</h2>
        <div className={styles.value}>{stopsCount}</div>
      </div>
      <PauseIcon color={stopsCount > 0 ? EColor.blue : EColor.greyC4}/>
    </div>
  );
}
