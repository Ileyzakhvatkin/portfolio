export function getWeekNumner(date: string): number {
  // valueOf - примитивное значение даты
  const oneJan: Date = new Date(new Date(date).getFullYear(),0,1);
  const numberOfDays: number = Math.floor((new Date(date).valueOf() - oneJan.valueOf()) / (24 * 60 * 60 * 1000));

  return Math.ceil(numberOfDays / 7 - oneJan.getDay());
}
