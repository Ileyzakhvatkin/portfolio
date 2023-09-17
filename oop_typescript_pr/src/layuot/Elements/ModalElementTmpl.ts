import { ElementTmpl } from "./../Abstracts/ElementTmpl";
import { ETrachAction } from './../../utils/enums';


export class ModalElementTmpl extends ElementTmpl {

  constructor(private action: ETrachAction,private trackTitle: string) {
    super();
  }

  public getElement(): HTMLDivElement {
    const title = this.action === ETrachAction.Add ? `Добавить трек "${this.trackTitle}" в плей-листы` : `Удалить трек "${this.trackTitle}" из плей-листлв`
    if (!this.element) {
      const item = document.createElement('div');
      item.classList.add('playlists-modal-bg');
      item.innerHTML = `
        <div class="playlists-modal">
          <div class="playlists-modal__title">${title}</div>
          <div class="playlists-modal__playlist_content">

          </div>
          <div class="playlists-modal__footer">
              <div class="playlists-modal__close-btn">
                  Далее...
              </div>
          </div>
        </div>
      `;
      return item;
    }
  }

}
