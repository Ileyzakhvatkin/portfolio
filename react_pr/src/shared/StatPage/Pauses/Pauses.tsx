import React from 'react';
import styles from './pauses.css';
import { PauseTimeIcon } from '../../IconCompomemts/PauseTimeIcon';
import { EColor } from '../../Utils/enums';
import { convertMillsecToHourMin } from '../../Utils/js/convertMillsecToHourMin';

interface IProps {
  pausesCount: number;
  pausesSum: number;
}

export function Pauses({ pausesCount, pausesSum}: IProps) {

  return (
    <div className={pausesCount > 0 ? styles.color : styles.pausesTime}>
      <div className={styles.info}>
        <h2 className={styles.title}>Время на паузе</h2>
        <div className={styles.value}>{convertMillsecToHourMin(pausesSum)}</div>
      </div>
      <PauseTimeIcon color={pausesCount > 0 ? EColor.violet : EColor.greyC4}/>
    </div>
  );
}
