export function convertSecToMinSec(millis: number): string {
  const minutes: number = Math.floor(millis / 60);
  const seconds: number = Number(((millis % 60)).toFixed());
  return minutes + ":" + ( seconds < 10 ? '0' : '' ) + seconds;
}
