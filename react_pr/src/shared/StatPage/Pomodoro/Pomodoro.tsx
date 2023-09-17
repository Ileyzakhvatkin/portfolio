import React from 'react';
import styles from './pomodoro.css';
import { PomodoroIcon } from '../../IconCompomemts/PomodoroIcon';
import { setTomatoNumber } from '../../Utils/js/setTomatoNumber';

interface IProps {
  tomatoSum: number;
}

export function Pomodoro({tomatoSum}: IProps) {

  return (
    <div className={styles.pomodoro}>
      {tomatoSum > 0
        ?
        <div className={styles.mainbox}>
          <div className={styles.tomatobox}><PomodoroIcon/><span>x {tomatoSum}</span></div>
          <div className={styles.redbox}>{setTomatoNumber(tomatoSum)}</div>
        </div>
        :
        <div className={styles.notomato}>
          <PomodoroIcon/>
        </div>
      }

    </div>
  );
}
