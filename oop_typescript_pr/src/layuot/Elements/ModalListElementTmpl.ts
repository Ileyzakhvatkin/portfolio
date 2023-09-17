import { PlayList } from "./../../utils/types";
import { ElementTmpl } from "./../Abstracts/ElementTmpl";

export class ModalListElementTmpl extends ElementTmpl {

  protected element: HTMLDivElement | null = null;

  constructor(private playList: PlayList) {
    super();
  }

  public getElement(): HTMLDivElement | undefined {
    if (!this.element) {
      const item = document.createElement('div');
      item.classList.add('playlists-modal__playlist');
      item.innerHTML = `
        <img src="${this.playList.img}" alt="${this.playList.title}" class="playlists-modal__playlist__image"/>
        <div class="playlists-modal__playlist__title">
          <span>${this.playList.title}</span>
          <span class="playlists-modal__track__statys"></span>
        </div>
        <div class="playlists-modal__playlist__info">${(this.playList.tracks && this.playList.tracks.length > 0) ? 'треков - ' + this.playList.tracks.length : 'нет треков'}</div>
      `;
      this.element = item;
      return item;
    }
  }

}
