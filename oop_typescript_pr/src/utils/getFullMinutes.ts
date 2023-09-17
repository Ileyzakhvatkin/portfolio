export function getFullMinutes(millis: number): string {
  if (millis === 0) return '0:00';
  const min = Math.floor((millis / (1000 * 60)) % 60);
  const sec = Math.floor((millis / (1000)) % 60);
  return `${min}:${sec}`;
}
