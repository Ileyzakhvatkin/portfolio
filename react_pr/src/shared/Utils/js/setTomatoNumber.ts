export function setTomatoNumber(tomatos: number): string {
  if (tomatos < 21 ) {
    switch (tomatos) {
      case 1:
        return `${tomatos} помидор`;
      case 2:
      case 3:
      case 4:
        return `${tomatos} помидора`;
      default:
        return `${tomatos} помидоров`
    }
  } else {
    switch (tomatos % 10) {
      case 1:
        return `${tomatos} помидор`;
      case 2:
      case 3:
      case 4:
        return `${tomatos} помидора`;
      default:
        return `${tomatos} помидоров`
    }
  }
}
