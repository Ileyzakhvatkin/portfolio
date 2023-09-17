import React, { useEffect, useRef, useState } from 'react';
import styles from './periodchoice.css';
import { Dropdown } from '../../Common/Dropdown';
import { GenericList } from '../../Common/GenericList';
import { marge } from '../../Utils/js/marge';
import { ArrowSelect } from '../../IconCompomemts/ArrowSelect';
import { getWeekNumner } from '../../Utils/js/getWeekNumner';

type IProps = {
  onChangePeriod: (value: number) => void;
}

export function PeriodChoice({onChangePeriod}: IProps) {
  const handleItemClick = (id: string) => {
    setSelectValue(options.filter((option) => option.id === id )[0]);
    setNotSelectList(options.filter((option) => option.id !== id ))
  };

  const options = [
    { As: 'button' as const, text: 'Эта неделя', id: String(getWeekNumner(String(new Date))) },
    { As: 'button' as const, text: 'Прошедшая неделя', id: String(getWeekNumner(String(new Date)) - 1) },
    { As: 'button' as const, text: '2 недели назад', id: String(getWeekNumner(String(new Date)) - 2) }
  ].map(marge({ onClick: handleItemClick }));

  const [ selectValue, setSelectValue ] = useState(options[0]);
  const [ notSelectList, setNotSelectList ] = useState(options.filter((option) => option !== options[0]));
  const [ arrowState, setArrowState ] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const [ select, setSelect ] = useState(false);

  useEffect(() => {
    setSelect(true)
  }, []);

  useEffect(() => onChangePeriod(Number(selectValue.id)), [selectValue]);

  return (
    <div className={'statSelect'} ref={ref}>
    { select && <Dropdown
                  button={<button className={styles.selectBtn}>
                    <span className={styles.selectTitle}>{selectValue.text}</span>
                    <span className={arrowState ? styles.arrowUp : styles.arrowDuwn }><ArrowSelect/></span>
                  </button>}
                  node={ref.current}
                  onOpen={() => setArrowState(true)}
                  onClose={() => setArrowState(false)}
                >
                  <div className={styles.selectList}>
                    <GenericList
                      list={notSelectList}
                    />
                  </div>
                </Dropdown>
    }
    </div>
  );
}
