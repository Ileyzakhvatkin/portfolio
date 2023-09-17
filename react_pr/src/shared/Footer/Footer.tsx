import React from 'react';
import styles from './footer.css';

import { useDispatch } from 'react-redux';
import { updateTasksList, updateTimesList } from '../../stor/stor';
import { demoTasks } from '../Data/demoTasks';
import { demoTime } from '../Data/demoStat';

export function Footer() {
  const dispatch = useDispatch();

  const handleStorage = () => {
    localStorage.clear();
    window.location.reload();
  }

  const handleDemoData = () => {
    localStorage.clear();
    dispatch(updateTasksList(demoTasks))
    localStorage.setItem('tasks', JSON.stringify(demoTasks));
    dispatch(updateTimesList(demoTime));
    localStorage.setItem('times', JSON.stringify(demoTime));
  }

  return (
    <footer>
      <div className={'footer'}>
        <div className={styles.container}>
          <button type='button' onClick={handleStorage}>localStorage clear</button>
          <button type='button' onClick={handleDemoData}>Загрузить DEMO данные</button>
        </div>
      </div>
    </footer>
  );
}
