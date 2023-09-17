import { PlayListsModel } from './../model/PlayListsModel';
import { ModalElementTmpl } from './../layuot/Elements/ModalElementTmpl';
import { ModalListElementTmpl } from '../layuot/Elements/ModalListElementTmpl';
import { demoPlayLists } from './../data/demoPlayLists';
import { ETrachAction } from '../utils/enums';


export class ModalPr {

  private playLists = (new PlayListsModel()).getPlayLists();

  constructor(private action: ETrachAction, private trackId: string, private trackTitle: string, private reRenderTracks: () => void) {

    const body: HTMLElement = document.querySelector('.body');
    if (body.querySelector('.playlists-modal')) body.querySelector('.playlists-modal').remove();

    const playListsModelData = new PlayListsModel;
    playListsModelData.setPlayLists(demoPlayLists);
    this.playLists = playListsModelData.getPlayLists();

    const modal = new ModalElementTmpl(action, this.trackTitle);
    const modalEl = modal.getElement();
    body.prepend(modalEl);

    const list: HTMLElement | null = document.querySelector('.playlists-modal__playlist_content');

    if (list) {
      const filterList = this.action === ETrachAction.Add
        ? this.playLists.filter((el) => el.tracks ? !el.tracks.includes(this.trackId) : true)
        : this.playLists.filter((el) => el.tracks ? el.tracks.includes(this.trackId) : false);

      if (filterList.length > 0) {
        filterList.forEach((el) => {
          const item = new ModalListElementTmpl(el);
          const itemEl = item.getElement();
          const addTrackToList = () => {
            if (this.action === ETrachAction.Add) {
              el.tracks ? el.tracks.push(this.trackId) : el.tracks = [this.trackId];
              playListsModelData.updatePlayList(el);
            } else {
              el.tracks.length === 1 ? el.tracks = null : el.tracks = el.tracks.filter((el) => el !== this.trackId);
              playListsModelData.updatePlayList(el);
            }
            itemEl.querySelector('.playlists-modal__track__statys').innerHTML =
              this.action === ETrachAction.Add ? '- Трек добавлен' : '- Трек удален';
            console.log(el.tracks);
          }
          list.append(itemEl);
          item.onClick('.playlists-modal__playlist__title', addTrackToList);
        })
      } else {
        list.innerHTML = this.action === ETrachAction.Add ? 'Трек добавлен во все плей-листы' : 'Трек удален из все плей-листов';
      }


      modalEl.addEventListener('click', (e: MouseEvent) => {
        if (e.target instanceof Node && !modalEl.querySelector('.playlists-modal').contains(e.target)) {
          modalEl.remove();
          this.reRenderTracks();
        }
      })
      modalEl.querySelector('.playlists-modal__close-btn').addEventListener('click', () => { modalEl.remove(); this.reRenderTracks(); });

    }
  }
}
