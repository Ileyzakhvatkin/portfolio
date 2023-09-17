import React, { useEffect, useRef, useState } from 'react';
import styles from './menu.css';
import { Dropdown } from '../../../../../Common/Dropdown';
import { DropMenuIcon } from '../../../../../IconCompomemts/DropMenuIcon';
import { ITask, updateTask } from '../../../../../../stor/stor';
import { EIcons, Icon } from '../../../../../Common/Icon';
import { useDispatch } from 'react-redux';
import { EColor } from '../../../../../Utils/enums';

interface IProps {
  task: ITask;
  handleEdit: () => void;
  handleDelete: () => void;
}

export function Menu({ task, handleEdit, handleDelete }: IProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [ menu, setMenu] = useState(false);
  useEffect(() => {setMenu(true)}, []);

  const dispatch = useDispatch();

  const habdleTaskPlus = () => {
    task.tomatos = task.tomatos + 1;
    dispatch(updateTask(task));
  };

  const habdleTaskMinus = () => {
    if (task.tomatos > 1) {
      task.tomatos = task.tomatos - 1;
      dispatch(updateTask(task));
    } else {
      return;
    }
  };

  return (
    <div className={styles.menu} ref={ref}>
      { menu && <Dropdown
                    button={<button className={styles.menuButton}><DropMenuIcon /></button>}
                    node={ref.current}
                  >
                  <div className={styles.dropdown}>
                    <ul className={styles.menuItemsList}>

                    <li className={styles.menuItem} onClick={habdleTaskPlus}>
                      <Icon name={EIcons.MenuPluseIcon}/> <span className='menuBtn'>Увеличить</span>
                    </li>

                    <li className={task.tomatos > 1 ? styles.menuItem : styles.menuItem + ' ' + styles.menuNotItem} onClick={habdleTaskMinus}>
                      <Icon name={EIcons.MenuMinusIcon} color={task.tomatos > 1 ? EColor.greenlight : EColor.greyC4}/> <span className='menuBtn'>Уменьшить</span>
                    </li>

                    <li className={styles.menuItem} onClick={handleEdit}>
                      <Icon name={EIcons.MenuEditIcon}/> <span className='menuBtn'>Редактировать</span>
                    </li>

                    <li className={styles.menuItem} onClick={handleDelete}>
                      <Icon name={EIcons.MenuDeleteIcon}/> <span className='menuBtn'>Удалить</span>
                    </li>

                    </ul>
                  </div>
                </Dropdown>
      }
    </div>
  );
}
