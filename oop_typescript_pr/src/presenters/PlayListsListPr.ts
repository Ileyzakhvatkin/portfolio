import { PlayListsTmpl } from '../layuot/PlayListsTmpl';
import { PlayListElementTmpl } from '../layuot/Elements/PlayListElementTmpl';
import { PlayListsModel } from './../model/PlayListsModel';

export class PlayListsListPr {
  private footer: HTMLElement = document.querySelector('.footer');

  constructor(
    private playListsModel: PlayListsModel,
    private setListID: (id: string) => void,
    private reRenderTracks: () => void,
    private reRenderPlayer: () => void
    ) {
    document.querySelector('.playlist').innerHTML = (new PlayListsTmpl()).getTemplate();
  }

  public renderList(selector: string): void {
    const list: HTMLElement | null = document.querySelector(selector);
    if (list) {this.playListsModel.getPlayLists().forEach((el) => {
        const itemEl = new PlayListElementTmpl(el);
        list.append(itemEl.getElement());
        const openPlayList = (e: MouseEvent) => {
          e.preventDefault()
          document.querySelector(`[data-target="tracks"]`).classList.add('section--active');
          document.querySelector(`[data-target="playlists"]`).classList.remove('section--active');
          this.setListID(el.id);
          this.reRenderTracks();
          this.reRenderPlayer();
          this.footer.dataset.id = '';
        }
        itemEl.onClickEvent('.playlist__h3__link', openPlayList);
      })
    }
  }
}
