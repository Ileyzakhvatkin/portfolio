import { PlayList } from '../../utils/types';
import { ElementTmpl } from "./../Abstracts/ElementTmpl";

export class AsideElementTmpl extends ElementTmpl {

  constructor(private data: PlayList) {
    super();
  }

  public getElement(): HTMLLIElement {
    if (!this.element) {
      const item = document.createElement('li');
      item.classList.add('aside__item');
      item.innerHTML = `<button class="aside__btn">${this.data.title}</button>`;
      this.element = item;
      return item;
    }
  }
}
