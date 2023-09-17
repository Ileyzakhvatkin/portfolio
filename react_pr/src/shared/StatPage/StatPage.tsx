import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './statpage.css';
import { IStatTime, RootState, updateTimesList } from '../../stor/stor';
import { PeriodChoice } from './PeriodChoice';
import { Info } from './Info';
import { Pomodoro } from './Pomodoro';
import { StatChart } from './StatChart';
import { Focus } from './Focus';
import { Stops } from './Stops';
import { Pauses } from './Pauses';
import { getWeekNumner } from '../Utils/js/getWeekNumner';
import { EStat } from '../Utils/enums';

export function StatPage() {
  const dispatch = useDispatch();
  const [ statPeriod, setStatPeriod ] = useState(getWeekNumner(String(new Date)));

  const handleChangePeriod = (period: number): void => {
    setStatPeriod(period);
  };

  let timesList: IStatTime[] = useSelector<RootState, IStatTime[]>(state => state.times);
  if (useSelector<RootState, IStatTime[]>(state => state.times) === undefined) timesList = [];
  if (timesList.length === 0) {
    const storData = localStorage.getItem('times');
    if (storData) dispatch(updateTimesList(JSON.parse(storData)));
  }

  timesList = timesList.filter((el) => getWeekNumner(el.time) == statPeriod);


  const pausesList = timesList.filter((el) => el.status === EStat.pauseSrart);
  const stopsList = timesList.filter((el) => el.status === EStat.stop);
  const tomatoList = timesList.filter((el) => el.status === EStat.final);

  let pausesSum = 0;
  for (let i = 0; i < (timesList.length - 1); i++) {
    if (timesList[i].status === EStat.pauseSrart && timesList[i + 1].status === EStat.pauseStop ) {
      pausesSum = pausesSum  + ((new Date(timesList[i + 1].time)).valueOf() - (new Date(timesList[i].time)).valueOf());
    }
  }

  let workTimeSum = 0;

  const timesData: {data: number, now: boolean}[] = [];

  for (let i = 1; i <= 7; i++) {
    timesData.push({data: 0, now: false});
  }

  for (let i = 0; i < (timesList.length - 1); i++) {
    if ((timesList[i].status === EStat.start && timesList[i + 1].status !== EStat.pauseStop)
          || (timesList[i].status === EStat.pauseStop && timesList[i + 1].status !== EStat.pauseSrart)) {
      // Всго рабочего времени
      workTimeSum = workTimeSum + ((new Date(timesList[i + 1].time)).valueOf() - (new Date(timesList[i].time)).valueOf());
    }
    // Данные для диаграммы
    const elDay = (new Date(timesList[i].time)).getFullYear() + '-' + (new Date(timesList[i].time)).getMonth() + '-' + (new Date(timesList[i].time)).getDate();
    const nowDay = (new Date()).getFullYear() + '-' + (new Date()).getMonth() + '-' + (new Date()).getDate();
    let addTime = 0;
    const elDayWeek = (new Date(timesList[i].time)).getDay();
    timesData[elDayWeek].now = nowDay == elDay ? true : false;
    if ((timesList[i].status === EStat.start || timesList[i].status === EStat.pauseStop)
          && (timesList[i + 1].status !== EStat.start || timesList[i + 1].status !== EStat.pauseStop)) {
      addTime = ((new Date(timesList[i + 1].time)).valueOf() - (new Date(timesList[i ].time)).valueOf()) / (1000 * 60);
      timesData[elDayWeek].data = timesData[elDayWeek].data + addTime;
    }
  }

  timesData.push(timesData[0]);
  timesData.shift();

  return (
    <div className='statistics'>
      <div className={styles.statPageTitleBox}>
        <h1 className={'title' + ' ' + styles.statPageTitle}>Ваша активность</h1>
        <PeriodChoice onChangePeriod={handleChangePeriod}/>
      </div>
      <div className={styles.statPageGrid1}>
        <div className={styles.statPageGrid1}>
          <Info workTimeSum={workTimeSum} />
          <Pomodoro tomatoSum={tomatoList.length}/>
        </div>
        <StatChart timesData={timesData} />
      </div>
      <div className={styles.statPageGrid2}>
        <Focus workTimeSum={workTimeSum} tomatoSum={tomatoList.length} />
        <Pauses pausesSum={pausesSum} pausesCount={pausesList.length} />
        <Stops stopsCount={stopsList.length} />
      </div>
    </div>
  );
}
