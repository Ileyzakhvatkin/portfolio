export function getDaysNumber(date: string): string {
  const fullDays = Math.floor(((new Date()).valueOf() - (new Date(date).valueOf())) / (1000 * 60 * 60 * 24));
  let dayTitle = '';
  if (fullDays < 21) {
    switch (fullDays) {
      case 1:
        dayTitle = 'день';
        break;
      case 2:
      case 3:
      case 4:
        dayTitle = 'дня';
        break;
      default:
        dayTitle = 'дней';
        break;
    }
  } else {
    switch (fullDays % 10) {
      case 1:
        dayTitle = 'день';
        break;
      case 2:
      case 3:
      case 4:
        dayTitle = 'дня';
        break;
      default:
        dayTitle = 'дней';
        break;
    }
  }

  return `${fullDays} ${dayTitle} назад`;
}
