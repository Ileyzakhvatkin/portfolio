import React, { DragEvent, useState } from 'react';
import styles from './taskslist.css';
import { Task } from './Task/Task';
import { ITask, updateTasksList } from '../../../../stor/stor';
import { useDispatch } from 'react-redux';
import { convertTomamtToTime } from '../../../Utils/js/convertTomamtToTime';
import { sortTasks } from '../../../Utils/js/sortTasks';

interface IProps {
  taskList: ITask[];
}

export function TasksList({taskList}: IProps) {
  const dispatch = useDispatch();

  const [currentTask, setCurrentTask] = useState<ITask | null>(null);

  function handleDragStart(e: DragEvent<HTMLDivElement>, task: ITask): void {
    setCurrentTask(task);
    (e.target as Element).classList.add(styles.taskOver);
  }

  function handleDragEnd(e: DragEvent<HTMLDivElement>): void {
    (e.target as Element).classList.remove(styles.taskOver);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
  }

  function handleDrop(e: DragEvent<HTMLDivElement>, task: ITask): void {
    e.preventDefault();
    dispatch(updateTasksList(taskList.map((t) => {
      if (currentTask) {
        if (t.id === task.id) {
          return {...t, order: currentTask.order}
        }
        if (t.id === currentTask.id) {
          return {...t, order: task.order}
        }
      }
      return t;
    })));
    // возвращаем фон
    (e.target as Element).classList.remove(styles.taskOver);
  }

  return (
    <div>
      <div className={styles.tasksList}>
        {taskList.sort(sortTasks).map((task) =>
          <div
            data-target={task.id}
            className={styles.task}
            key={task.id}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, task)}
            onDragEnd={(e) => handleDragEnd(e)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, task)}
          >
            <Task task={task} key={task.id} />
          </div>
        )}

      </div>
      <div className={styles.leftBarTasksTime}>{convertTomamtToTime(taskList.reduce((acc, task) => acc + task.tomatos, 0))}</div>
    </div>
  );
}
