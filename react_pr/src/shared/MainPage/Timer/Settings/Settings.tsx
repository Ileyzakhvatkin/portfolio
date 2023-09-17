import React, { FormEvent } from 'react';
import styles from './settings.css';
import { useDispatch } from 'react-redux';
import { updateTmpl } from '../../../../stor/stor';
import { useIsMouned } from '../../../../hooks/useIsMouned';

interface IProps {
  onClose: () => void;
}

export function Settings(props: IProps) {
  const dispatch = useDispatch();
  const [ isMounted ] = useIsMouned();

  let localSt = false;
  if (isMounted) {
    const data = localStorage.getItem('blaskTmpl');
    if ( data !== null ) {
      localSt = JSON.parse(data);
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(updateTmpl(!localSt));
    localStorage.setItem('blaskTmpl', JSON.stringify(!localSt));
    props.onClose?.();
  }

  return (
    <div>
      <h3 className={styles.title}>Настройки</h3>
        <div className='modalBtnBox'>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.inputBox}>
              <input
                type='checkbox'
                className={styles.taskInput}
                defaultChecked={localSt}
                />
              <span>Темный интерфейс</span>
            </label>
            <button className='btn btnGreen' type='submit'>Сохранить</button>
          </form>
          <button onClick={() => props.onClose?.()}>Отменить</button>
        </div>
    </div>
  );
}
