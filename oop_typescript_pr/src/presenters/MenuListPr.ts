import { AsideTmpl } from './../layuot/AsideTmpl';
import { AsideElementTmpl } from './../layuot/Elements/AsideElementTmpl';
import { PlayListsModel } from './../model/PlayListsModel';

export class MenuListPr {
  private tracksList = document.querySelector(`[data-target="tracks"]`);
  private playLists = document.querySelector(`[data-target="playlists"]`);
  private footer: HTMLElement = document.querySelector('.footer');

  constructor(
    private playListsModel: PlayListsModel,
    private setListID: (id: string) => void,
    private setSearch: (id: string) => void,
    private reRenderTracks: () => void,
    private reRenderPlayer: () => void
    ) {
    const aside = new AsideTmpl();
    document.querySelector('.aside').innerHTML = aside.getTemplate();


    const showTracksList = () => {
      this.tracksList.classList.add('section--active');
      this.playLists.classList.remove('section--active');
      this.setListID('');
      this.setSearch(null);
      this.reRenderTracks();
      this.reRenderPlayer();
      this.footer.dataset.id = '';
    }

    const showPlayListsList = () => {
      this.tracksList.classList.remove('section--active');
      this.playLists.classList.add('section--active');
      this.setSearch('');
      this.footer.dataset.id = '';
    }

    aside.onClick(`[data-path="tracks"]`, showTracksList);
    aside.onClick(`[data-path="playlists"]`, showPlayListsList);
  }

  public renderMenu(selector: string): void {
    const list: HTMLElement | null = document.querySelector(selector);

    if (list) {
      this.playListsModel.getPlayLists().forEach((el) => {
        const menuItem = new AsideElementTmpl(el);
        list.append(menuItem.getElement());

        const showPlayList = () => {
          this.tracksList.classList.add('section--active');
          this.playLists.classList.remove('section--active');

          this.setListID(el.id);
          this.setSearch(null);
          this.reRenderTracks();
          this.reRenderPlayer();
          const search: HTMLInputElement = document.querySelector('.header__search__field');
          search.value = '';
          this.footer.dataset.id = '';
        }

        menuItem.onClick('.aside__btn', showPlayList);
      })
    }
  }
}


