import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './taskeditform.css';
import { useDispatch } from 'react-redux';
import { ITask, updateTask } from '../../../../../../stor/stor';
import { validateValue } from '../../../../../Utils/js/validateValue';

interface IProps {
  task: ITask;
  onClose?: () => void;
}

export function TaskEditForm(props: IProps) {
  const dispatch = useDispatch();
  const [ value, setValue ] = useState(props.task.title);
  const [ touched, setTouched ] = useState(false);
  const [ valueError, setValueError ] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTouched(true);
    setValueError(validateValue(value));

    const isFormValid = !validateValue(value);
    if (!isFormValid) return;
    props.task.title = value;
    dispatch(updateTask(props.task));
    props.onClose?.()
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form className={styles.editTask} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Изменить задачу:</h3>
      <input
        className={styles.editInput}
        value={value}
        onChange={handleChange}
        aria-invalid={valueError ? true : undefined}
      />
      <div className={styles.taskFormError} >
        {touched && valueError && <div>{valueError}</div>}
      </div>
      <div className='modalBtnBox'>
        <button type="submit" className='btn btnGreen'>Изменить</button>
        <button onClick={() => props.onClose?.()}>Отменить</button>
      </div>
    </form>
  );
}
