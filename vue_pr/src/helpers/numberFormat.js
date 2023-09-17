// Функция форматирования числа из библиотеки Intl
export default function numberFormat(value) {
  return new Intl.NumberFormat().format(value);
}
