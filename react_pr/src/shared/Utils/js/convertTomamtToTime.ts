import { PERIOD } from "../constants";

export function convertTomamtToTime(tometos: number): string {
  const minutes: number = tometos * PERIOD;
  const hour: number = Math.floor(minutes / 60);
  const hourSt: string = hour > 0 ? `${hour} час ` : '';
  const minutesSt: string = `${(minutes - hour * 60).toFixed(1)} мин`;
  return minutes > 0 ? hourSt + minutesSt : '';
}
