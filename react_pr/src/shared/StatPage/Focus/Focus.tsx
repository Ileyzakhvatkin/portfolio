import React from 'react';
import styles from './focus.css';
import { FocusIcon } from '../../IconCompomemts/FocusIcon';
import { EColor } from '../../Utils/enums';

interface IProps {
  workTimeSum: number;
  tomatoSum: number;
}

export function Focus({workTimeSum, tomatoSum}: IProps) {
  let focus = '';
  if (workTimeSum == undefined || tomatoSum == undefined || workTimeSum == 0 || tomatoSum == 0) {
    focus = '0';
  } else {
    focus = (workTimeSum / (1000 * 60 * tomatoSum * 25)).toFixed(2);
  }

  return (
    <div className={workTimeSum > 0 ? styles.focusColor : styles.focus}>
      <div className={styles.focusInfo}>
        <h2 className={styles.focusTitle}>Фокус</h2>
        <div className={styles.focusValue}>{focus}%</div>
      </div>
      <FocusIcon color={workTimeSum > 0 ? EColor.orange : EColor.greyC4}/>
    </div>
  );
}
