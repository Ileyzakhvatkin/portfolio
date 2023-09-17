export function getWeekDay(date: Date, type: number = 0): string {
  const days: string[] = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  const daysFull: string[] = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  return type === 1 ? daysFull[date.getDay()] : days[date.getDay()];
}
