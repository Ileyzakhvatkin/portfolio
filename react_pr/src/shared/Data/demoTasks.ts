import { ITask } from "../../stor/stor";
import { generateId } from "../Utils/react/generateId/generateId";

export const demoTasks: ITask[] = [
  {
    title: 'Создать проект 1',
    tomatos: 4,
    createdAt: 'Tue Jul 11 2023 20:20:00',
    isDone: true,
    order: 1,
  },
  {
    title: 'Создать проект 2',
    tomatos: 2,
    createdAt: 'Tue Jul 11 2023 20:20:00',
    isDone: true,
    order: 2,
  },
  {
    title: 'Создать проект 3',
    tomatos: 3,
    createdAt: 'Tue Jul 18 2023 20:20:00',
    isDone: false,
    order: 3,
  },
  {
    title: 'Создать проект',
    tomatos: 5,
    createdAt: 'Tue Jul 18 2023 20:20:00',
    isDone: false,
    order: 4,
  },
  {
    title: 'Создать сайт',
    tomatos: 1,
    createdAt: 'Sun Jul 20 2023 20:20:00',
    isDone: false,
    order: 5,
  },
  {
    title: 'Написть техническое задание',
    tomatos: 2,
    createdAt: 'Sun Jul 23 2023 12:18:00',
    isDone: false,
    order: 6,
  },
  {
    title: 'Настроить рекламу',
    tomatos: 2,
    createdAt: 'Sun Jul 23 2023 14:18:00',
    isDone: false,
    order: 7,
  },
].map(generateId);
