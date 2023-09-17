// Добавдение каких либо значений в объект
export function marge<O extends object>(obj: O) {
  return <K extends object>(obj2: K) => ({...obj, ...obj2})
}
