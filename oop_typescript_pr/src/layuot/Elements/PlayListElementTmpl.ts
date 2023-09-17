import { PlayList } from './../../utils/types';
import { ElementTmpl } from "./../Abstracts/ElementTmpl";

export class PlayListElementTmpl extends ElementTmpl {

  constructor(protected data: PlayList) {
    super();
  }

  public getElement(): HTMLLIElement {
    if (!this.element) {
      const item = document.createElement('li');
      item.classList.add('playlist__item');
      item.innerHTML = `
        <picture>
          <source srcset="${this.data.img360}" media="(max-width: 576px)">
          <source srcset="${this.data.img1440}" media="(max-width: 1440px)">
          <img class="playlist__img" src="${this.data.img}" alt="${this.data.title}">
        </picture>
        <div class="playlist__content">
          <h3 class="playlist__h3">
            <a class="playlist__h3__link" href="#">${this.data.title}</a>
          </h3>
          <span class="playlist__count">${this.data.tracks ? this.data.tracks.length : '0'} треков</span>
        </div>
      `;
      this.element = item;
      return item;
    }
  }

}
