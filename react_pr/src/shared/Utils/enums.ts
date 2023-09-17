export interface IIconProps {
  color?: EColor;
}

export enum EColor {
  greyC4 = 'greyC4',
  orange = 'orange',
  violet = 'violet',
  blue = 'blue',
  greenlight = 'greenlight'
}

export enum ETimer {
  start = 'Старт',
  pause = 'Пауза',
  continue = 'Продолжить',
  skip = 'Пропустить',
  stop = 'Стоп',
  done = 'Сделано',
}

export enum EStat {
  start = 'start',
  pauseSrart = 'pauseSrart',
  pauseStop = 'pauseStop',
  final = 'final',
  stop = 'stop',
}
