import { ITask } from "../../../stor/stor";

export const sortTasks = (a: ITask, b: ITask): number => {
  return a.order > b.order ? 1 : -1;
}
