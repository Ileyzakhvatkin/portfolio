import { RootState } from "../../../stor/stor";

export function saveToLocalStorage(state: RootState, key: string): void {
  // console.log(state);
  try {
    switch (key) {
      case 'tasks':
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
        break;
      case 'times':
        localStorage.setItem('tasks', JSON.stringify(state.times));
        break;
    }
  } catch (e) {
    console.warn(e);
  }
}
