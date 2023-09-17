import { ActionCreator, AnyAction, Reducer } from "redux";
import { EStat } from "../shared/Utils/enums";

export interface ITask {
  title: string;
  tomatos: number;
  createdAt: string;
  isDone: boolean;
  id: string;
  order: number;
}

export interface IStatTime {
  time: string;
  status: EStat;
}

export type RootState = {
  tasks: ITask[];
  status: boolean;
  times: IStatTime[];
  tmpl: boolean;
}

const initialState: RootState = {
  tasks: [],
  status: false,
  times: [],
  tmpl: false,
}

const UPDATE_TASKS_LIST = 'UPDATE_TASKS_LIST';
const CREATE_TASK = 'CREATE_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const DELETE_TASK = 'DELETE_TASK';
const UPDATE_TIMER_STATUS = 'UPDATE_TIMER_STATUS';
const UPDATE_TIMES_LIST = 'UPDATE_TIMES_LIST';
const ADD_TIME = 'ADD_TIME';
const UPDATE_TMPL = 'UPDATE_TMPL';

export const updateTasksList: ActionCreator<AnyAction> = (tasks) => ({
  type: UPDATE_TASKS_LIST,
  tasks
})

export const createTask: ActionCreator<AnyAction> = (task) => ({
  type: CREATE_TASK,
  task
})

export const updateTask: ActionCreator<AnyAction> = (task) => ({
  type: UPDATE_TASK,
  task
})

export const deleteTask: ActionCreator<AnyAction> = (id) => ({
  type: DELETE_TASK,
  id
})

export const updateTimerStatus: ActionCreator<AnyAction> = (status) => ({
  type: UPDATE_TIMER_STATUS,
  status
})

export const updateTimesList: ActionCreator<AnyAction> = (times) => ({
  type: UPDATE_TIMES_LIST,
  times
})

export const addTime: ActionCreator<AnyAction> = (time) => ({
  type: ADD_TIME,
  time
})

export const updateTmpl: ActionCreator<AnyAction> = (tmpl) => ({
  type: UPDATE_TMPL,
  tmpl
})

export const rootReducer: Reducer<RootState> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TASKS_LIST:
      return {
        ...state,
        tasks: state.tasks = action.tasks,
      }
    case CREATE_TASK:
      return {
        ...state,
        tasks: state.tasks !== undefined ? state.tasks.concat(action.task) : state.tasks = [action.task],
      }
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task: ITask) => {
          if (task.id === action.task.id) task = action.task;
          return task;
        }),
      }
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task: ITask) => task.id !== action.id),
        }

    case UPDATE_TIMER_STATUS:
      return {
        ...state,
        status: action.status,
        }
    case UPDATE_TIMES_LIST:
      return {
        ...state,
        times: state.times = action.times,
      }
    case ADD_TIME:
      return {
        ...state,
        times: state.times !== undefined ? state.times.concat(action.time) : state.times = [action.time],
        }
    case UPDATE_TMPL:
      return {
        ...state,
        tmpl: state.tmpl = action.tmpl,
        }

    default:
      return state;
  }
}


