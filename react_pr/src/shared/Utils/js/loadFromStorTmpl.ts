export function loadFromStorTmpl(): boolean {
  let tmpl = false;
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('blaskTmpl');
    if ( data !== null ) {
      tmpl = JSON.parse(data);
    }
  }
  return tmpl;
}
