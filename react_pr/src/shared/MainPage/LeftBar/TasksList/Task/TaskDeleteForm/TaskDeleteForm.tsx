import React from 'react';
import styles from './taskdeleteform.css';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../../../../../stor/stor';

interface IProps {
  id: string;
  onClose?: () => void;
}

export function TaskDeleteForm(props: IProps) {
  const dispatch = useDispatch();

  const habdleTaskDelete = () => {
    dispatch(deleteTask(props.id));
  };

  return (
    <div>
      <h3 className={styles.title}>Удалить задуачу?</h3>
        <div className='modalBtnBox'>
          <button className='btn btnRed' onClick={habdleTaskDelete}>Удалить</button>
          <button onClick={() => props.onClose?.()}>Отменить</button>
        </div>
    </div>

  );
}
