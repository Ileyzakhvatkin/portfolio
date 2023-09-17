export function loadFromLocalStorage(key: string) {
  try {
    const serialisedState = localStorage.getItem(key);
    if (serialisedState === null) return undefined;
    // console.log(JSON.parse(serialisedState))
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}
