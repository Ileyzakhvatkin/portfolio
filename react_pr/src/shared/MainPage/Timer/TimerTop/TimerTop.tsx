import React from 'react';
import styles from './timertop.css';
import { ITask } from '../../../../stor/stor';

interface IProps {
  currentTask: ITask;
  statusTop: string;
}

export function TimerTop({currentTask, statusTop}: IProps) {
  let topColor;
  switch (statusTop) {
    case 'green':
      topColor = styles.topColorGreen;
      break;
    case 'red':
      topColor = styles.topColorRed;
      break;
    default:
      topColor = styles.topColorGrey;
      break;
  }

  return (
    <div className={styles.timerTop + ' ' + topColor}>
      <div className={styles.taskTitle}>{ currentTask.title }</div>
      <div className={styles.pomodori}>{ currentTask.tomatos > 0 ? `Помидор ${currentTask.tomatos}` : '' }</div>
    </div>
  );
}
