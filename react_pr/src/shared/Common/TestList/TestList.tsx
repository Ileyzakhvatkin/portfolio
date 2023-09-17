import React, { DragEvent, useState } from 'react';
import styles from './testlist.css';

interface ITask {
  id: number;
  order: number;
  text: string;
}

const textList: ITask[] = [
  {id: 1, order: 1, text: 'Cart 1'},
  {id: 2, order: 2, text: 'Cart 2'},
  {id: 3, order: 3, text: 'Cart 3'},
  {id: 4, order: 4, text: 'Cart 4'},
];

export function TestList() {
  const [taskList, setTaskList] = useState(textList);
  const [currentTask, setCurrentTask] = useState<ITask | null>(null);

  function handleDragStart(task: ITask): void {
    setCurrentTask(task);
  }

  function handleDragEnd(e: DragEvent<HTMLDivElement>): void {
    (e.target as Element).classList.remove(styles.taskOver);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    (e.target as Element).classList.add(styles.taskOver);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>, task: ITask): void {
    e.preventDefault();
    setTaskList(taskList.map((t) => {
      if (currentTask) {
        if (t.id === task.id) {
          return {...t, order: currentTask.order}
        }
        if (t.id === currentTask.id) {
          return {...t, order: task.order}
        }
      }
      return t;
    }));
    // возвращаем фон
    (e.target as Element).classList.remove(styles.taskOver);

  }

  const sortTasks = (a: ITask, b: ITask): number => {
    return a.order > b.order ? 1 : -1;
  }


  return (
    <div className={styles.box}>
      <h4 className={styles.title}>Тестовый список</h4>
      <div className={styles.map}>
        {taskList.sort(sortTasks).map((task) =>
          <div
            data-target={task.id}
            className={styles.task}
            key={task.id}
            draggable={true}
            onDragStart={() => handleDragStart(task)}
            onDragEnd={(e) => handleDragEnd(e)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, task)}
          >
            {task.text}
          </div>
        )}
      </div>
    </div>

  );
}
