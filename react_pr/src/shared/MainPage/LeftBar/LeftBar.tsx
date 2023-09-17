import React from 'react';
import styles from './leftbar.css';
import { TasksList } from './TasksList';
import { TaskForm } from './TaskForm';
import { ITask, RootState, createTask } from '../../../stor/stor';
import { useDispatch, useSelector } from 'react-redux';
import { generateId } from '../../Utils/react/generateId/generateId';

export function LeftBar() {
  const dispatch = useDispatch();
  let taskList = useSelector<RootState, ITask[]>(state => state.tasks)
  if (taskList) taskList = taskList.filter((task) => !task.isDone);
  if (useSelector<RootState, ITask[]>(state => state.tasks) === undefined) taskList = [];

  const timerStatus = useSelector<RootState, boolean>(state => state.status);

  function handekAddTask(title: string): void {
    dispatch(createTask(generateId({title: title, tomatos: 1, createdAt: new Date, isDone: false, order: !taskList ? 1 : taskList.length + 1 })));
  }

  return (
    <div className={styles.leftBar}>
      <h1 className={'title' + ' ' + styles.leftBarTitle}>Ура! Теперь можно начать работать:</h1>
      <ul className={'list' + ' ' + styles.leftBarDesc}>
        <li><span>Выберите категорию и напишите название текущей задачи</span></li>
        <li><span>Запустите таймер («помидор»)</span></li>
        <li><span>Работайте пока «помидор» не прозвонит</span></li>
        <li><span>Сделайте короткий перерыв (3-5 минут)</span></li>
        <li><span>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</span></li>
      </ul>
      <TaskForm onAddTask={handekAddTask} timerStatus={timerStatus} />
      {(taskList && !timerStatus) && <TasksList taskList={taskList} />}
    </div>
  );
}
