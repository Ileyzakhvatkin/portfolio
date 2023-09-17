export abstract class ElementTmpl {

  protected element: Element | null = null;

  abstract getElement(): Element;

  public onClick(selector: string, fn: () => void): void {
    if (this.element.querySelector(selector)) {
      this.element.querySelector(selector).addEventListener('click', fn)
    }
  }

  public onClickEvent(selector: string, fn: (e: MouseEvent) => void): void {
    if (this.element.querySelector(selector)) {
      this.element.querySelector(selector).addEventListener('click', fn)
    }
  }
}
