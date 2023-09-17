export function convertMillsecToFullHourMin(millis: number): string {
  const hours = Math.floor((millis / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((millis / (1000 * 60)) % 60);
  let lableH = '';
  switch (hours % 10) {
    case 1:
      lableH = 'час';
      break;
    case 2:
    case 3:
    case 4:
      lableH = 'часа';
      break;
    default:
      lableH = 'часов';
      break;
  }
  return (hours > 0 ? `${hours} ${lableH} ` : '') + (minutes > 0 ? `${minutes} мин` : '');
}
