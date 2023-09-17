import React, { useState } from 'react';
import styles from './task.css';
import { ITask } from '../../../../../stor/stor';
import { Menu } from './Menu';
import { Modal } from '../../../../Common/Modal';
import { TaskEditForm } from './TaskEditForm';
import { TaskDeleteForm } from './TaskDeleteForm';

interface IProps {
  task: ITask;
}

export function Task({task}: IProps) {
  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  return (
    <div className={styles.task}>
      <div className={styles.taskTomatos}>{task.tomatos}</div>
      <div className={styles.taskTitle}>{task.title}</div>
      <Menu
        task={task}
        handleEdit={() => {
          setIsEditModal(true);
        }}
        handleDelete={() => {
          setIsDeleteModal(true);
        }}
      />
      {isEditModal && (
        <Modal  onClose={() => setIsEditModal(false)}>
          <TaskEditForm task={task} onClose={() => setIsEditModal(false)}/>
        </Modal>
      )}
      {isDeleteModal && (
        <Modal onClose={() => setIsDeleteModal(false)}>
          <TaskDeleteForm id={task.id} onClose={() => setIsDeleteModal(false)} />
        </Modal>
      )}
    </div>
  );
}
