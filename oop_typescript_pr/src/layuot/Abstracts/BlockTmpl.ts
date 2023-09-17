export abstract class BlockTmpl {

  abstract getTemplate(): string;

  public onClick(selector: string, fn: () => void): void {
    document.querySelector(selector).addEventListener('click', fn);
  }

  public onClickEvent(selector: string, fn: (e: MouseEvent) => void): void {
    document.querySelector(selector).addEventListener('click', fn);
  }

}
