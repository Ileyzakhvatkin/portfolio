export function validateValue(value: string): string {
  return value.length <= 3 ? 'Введите больше 3-х символов' : '';
}
