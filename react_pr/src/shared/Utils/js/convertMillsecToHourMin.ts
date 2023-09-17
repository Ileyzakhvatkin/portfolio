export function convertMillsecToHourMin(millis: number): string {
  if (millis === 0) return '0м';
  const hours = Math.floor((millis / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((millis / (1000 * 60)) % 60);
  return (hours > 0 ? `${hours}ч ` : '') + (minutes > 0 ? `${minutes}м` : '');
}
