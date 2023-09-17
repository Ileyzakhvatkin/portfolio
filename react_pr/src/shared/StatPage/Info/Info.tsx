import React from 'react';
import styles from './info.css';
import { getWeekDay } from '../../Utils/js/getWeekDay';
import { convertMillsecToFullHourMin } from '../../Utils/js/convertMillsecToHourMin copy';

interface IProps {
  workTimeSum: number;
}

export function Info({ workTimeSum }: IProps) {
  return (
    <div className={styles.info}>
      <h2 className={styles.infoTitle}>{getWeekDay((new Date()), 1)}</h2>
      <div className={styles.infoDesc}>
        { workTimeSum === 0 ? 'Нет данных' :
          <div>
            <span>Вы работали над задачами в течение </span>
            <span className={styles.infoTime}>{convertMillsecToFullHourMin(workTimeSum)}</span>
          </div>
        }
      </div>
    </div>
  );
}
