import React, { useState } from 'react';
import styles from './timer.css';
import { TimerTop } from './TimerTop';
import { TimerMain } from './TimerMain';
import { useSelector } from 'react-redux';
import { ITask, RootState } from '../../../stor/stor';
import { sortTasks } from '../../Utils/js/sortTasks';

export function Timer() {
  const tasks: ITask[] = useSelector<RootState, ITask[]>(state => state.tasks);
  let currentTask = null;
  if (tasks) currentTask = tasks.filter((task) => !task.isDone).sort(sortTasks)[0];

  const [statusTop, setStatusTop] = useState('');

  return (
    <div className={styles.timer}>
      { currentTask ? (
          <div className={styles.timerBox}>
            <TimerTop
              currentTask={currentTask}
              statusTop={statusTop}
            />
            <TimerMain
              currentTask={currentTask}
              setStatusTop={(value) => {setStatusTop(value)}}
            />
        </div>
      ) : (
        <div className={styles.notTasks}>Нет ни одной  задачи</div>
      )}
    </div>
  );
}
