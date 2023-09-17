import React from 'react';
import styles from './taskfinished.css';

interface IProps {
  onClose: () => void;
}

export function TaskFinished(props: IProps) {
  return (
    <div>
      <h3 className={styles.title}>Задача завершена!</h3>
      <div className='modalBtnBox'>
        <button className='btn btnGreen' onClick={() => props.onClose?.()}>OK!</button>
      </div>
    </div>
  );
}
