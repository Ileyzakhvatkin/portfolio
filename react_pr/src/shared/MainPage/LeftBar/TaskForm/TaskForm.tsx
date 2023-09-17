import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './taskform.css';
import { validateValue } from '../../../Utils/js/validateValue';

interface IProps {
  onAddTask: (value: string) => void;
  timerStatus: boolean;
}

export function TaskForm({onAddTask, timerStatus}: IProps) {
  const [ value, setValue ] = useState('');
  const [ touched, setTouched ] = useState(false);
  const [ valueError, setValueError ] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTouched(true);
    setValueError(validateValue(value));

    const isFormValid = !validateValue(value);
    if (!isFormValid) return;

    onAddTask(value);
    setValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form className={styles.taskForm} onSubmit={handleSubmit}>
      <input
        className={styles.taskInput}
        value={value}
        onChange={handleChange}
        aria-invalid={valueError ? true : undefined}
        placeholder={timerStatus ? 'Сначала остановите счетчик' : 'Новая задача'}
      />
      <div className={styles.taskFormError} >
        {touched && valueError && <div>{valueError}</div>}
      </div>
      <button className="btn btnGreen" type="submit" disabled={ timerStatus } >Добавить</button>
    </form>
  );
}
