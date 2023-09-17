import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './timermain.css';
import { ITask, addTime, updateTask, updateTimerStatus } from '../../../../stor/stor';
import { PlusIcon } from '../../../IconCompomemts/PlusIcon';
import { convertSecToMinSec } from '../../../Utils/js/convertSecToMinSec';
import { EStat, ETimer } from '../../../Utils/enums';
import { PERIOD } from '../../../Utils/constants';
import { Modal } from '../../../Common/Modal';
import { Settings } from '../Settings';
import { TaskFinished } from '../TaskFinished';

interface IProps {
  currentTask: ITask;
  setStatusTop: (value: string) => void;
}

export function TimerMain({currentTask, setStatusTop}: IProps) {
  const [ timer, setTimer ] = useState(PERIOD * 60);
  const [ startBtn, setStartBtn ] = useState(ETimer.start);
  const [ stopBtn, setStopBtn ] = useState(ETimer.stop);
  const firstStart = useRef(true);
  const tick: { current: NodeJS.Timeout | undefined } = useRef();
  const [ isModalOpened, setIsModalOpened ] = useState(false);
  const [ isModalFinished, setIsModalFinished ] = useState(false);
  const dispatch = useDispatch();

  const handleStart = () => {
    if (startBtn === ETimer.start) {
      // Нажимая на Старт - запускается счетчик
      setStartBtn(ETimer.pause);
      setStopBtn(ETimer.stop);
      dispatch(updateTimerStatus(true));
      setStatusTop('red');
      dispatch(addTime({time: new Date(), status: EStat.start}));
    } else if (startBtn === ETimer.pause) {
      //Запускщенный счетчик ставим на паузу
      setStartBtn(ETimer.continue);
      setStopBtn(ETimer.done);
      dispatch(updateTimerStatus(true));
      setStatusTop('green');
      dispatch(addTime({time: new Date(), status: EStat.pauseSrart}));
    } else if (startBtn === ETimer.continue) {
      //Счетчик ставим на паузе запускаем его вновь
      setStartBtn(ETimer.pause);
      setStopBtn(ETimer.stop);
      dispatch(updateTimerStatus(true));
      setStatusTop('red');
      dispatch(addTime({time: new Date(), status: EStat.pauseStop}));
    }
  };

  const handleStop = () => {
    if (stopBtn === ETimer.stop) {
      //Останавливаем выполнение задачи
      setStartBtn(ETimer.start);
      setStopBtn(ETimer.stop);
      dispatch(updateTimerStatus(false));
      setTimer(PERIOD * 60);
      setStatusTop('grey');
      dispatch(addTime({time: new Date(), status: EStat.stop}));
    } else if (stopBtn === ETimer.done) {
      //Закрываем задачу
      setStartBtn(ETimer.start);
      setStopBtn(ETimer.stop);
      currentTask.isDone = true;
      dispatch(updateTask(currentTask));
      dispatch(updateTimerStatus(false));
      setTimer(PERIOD * 60);
      setStatusTop('grey');
      setIsModalFinished(true);
      dispatch(addTime({time: new Date(), status: EStat.final}));
    } else if (stopBtn === ETimer.skip) {
      //Появляется - Пропускаем перерыв
      setStartBtn(ETimer.pause);
      setStopBtn(ETimer.stop);
      setTimer(PERIOD * 60);
      dispatch(updateTimerStatus(true));
      setStatusTop('red');
      dispatch(addTime({time: new Date(), status: EStat.start}));
    }
  }

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }

    if (startBtn === ETimer.pause) {
      let time: number = timer;
      tick.current = setInterval(() => {
        if (time > 0) {
          setTimer((timer) => timer - 1);
          time = time - 1;
        } else {
          // Счетчик закончился
          currentTask.tomatos = currentTask.tomatos - 1;
          if (currentTask.tomatos === 0) {
            currentTask.isDone = true;
            setStartBtn(ETimer.start);
            setStopBtn(ETimer.stop);
            setStatusTop('grey');
            setTimer(PERIOD * 60);
            dispatch(updateTimerStatus(false));
            setIsModalFinished(true);
            dispatch(addTime({time: new Date(), status: EStat.final}));
          } else {
            setStartBtn(ETimer.start);
            setStopBtn(ETimer.skip);
            setStatusTop('green');
            setTimer(PERIOD * 60);
            dispatch(updateTimerStatus(true));
            dispatch(addTime({time: new Date(), status: EStat.final}));
          }
          dispatch(updateTask(currentTask));
          clearInterval(tick.current as NodeJS.Timeout);
        }
      }, 1000);
    } else {
      clearInterval(tick.current as NodeJS.Timeout);
    }
    // return () => clearInterval(tick.current); // <-- clear on unmount!
  }, [startBtn]);

  return (
    <div className={styles.timerMain}>
      <div className={styles.timerTimer}>
        <span className='timerColor'>{convertSecToMinSec(timer)}</span>
        <button className={styles.timerPluse} onClick={() => setIsModalOpened(true)}>
          <PlusIcon />
        </button>
      </div>
      <div className={styles.timerTask}>
        <span className={styles.timerTaskOrder}>Задача 1</span> - <span>{currentTask.title}</span>
      </div>
      <div className={styles.timerBtns}>
        <button
          className="btn btnGreen"
          onClick={handleStart}
          >{ startBtn }</button>
        <button
          className="btn btnRed"
          onClick={handleStop}
          disabled={( startBtn === ETimer.start && stopBtn !== ETimer.skip ) ?? true }
          >{ stopBtn }</button>
      </div>
      {isModalOpened && (
        <Modal onClose={() => setIsModalOpened(false)}>
          <Settings onClose={() => setIsModalOpened(false)}/>
        </Modal>
      )}
      {isModalFinished && (
        <Modal onClose={() => setIsModalFinished(false)}>
          <TaskFinished onClose={() => setIsModalFinished(false)}/>
        </Modal>
      )}
    </div>
  );
}
