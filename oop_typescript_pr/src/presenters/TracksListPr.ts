import { EUserAction } from './../utils/enums';
import { TracksTmpl } from '../layuot/TracksTmpl';
import { TracksModel } from './../model/TracksModel';
import { TrackPr } from './TrackPr';
import { ModalPr } from './../presenters/ModalPr';
import { ETrachAction } from '../utils/enums';

export class TracksListPr {

  constructor(private tracksModel: TracksModel, private reRenderTracks: () => void, private reRenderPlayer: () => void) {
    document.querySelector('.tracks').innerHTML = (new TracksTmpl()).getTemplate();
  }

  public renderTracks(selector: string, playListTracks: string[], search: string = null): void {
    const listEl: HTMLElement | null = document.querySelector(selector);

    if (listEl) {
      if (playListTracks) {
          this.tracksModel.getTracks(search, playListTracks).forEach((el, i) => {
          const chooseAction = (type: EUserAction) => {
             switch (type) {
              case EUserAction.Like:
                return () => {
                  el.favorites = !el.favorites;
                  this.tracksModel.updateTrack(el);
                  this.reRenderTracks();
                };
              case EUserAction.AddPL:
                return () => {
                  document.querySelectorAll('.track__dropdown').forEach((el: HTMLElement) => el.style.display = 'none');
                  (new ModalPr(ETrachAction.Add, el.id, el.title, this.reRenderTracks));
                };
              case EUserAction.DeletePL:
                return () => {
                  document.querySelectorAll('.track__dropdown').forEach((el: HTMLElement) => el.style.display = 'none');
                  (new ModalPr(ETrachAction.Delete, el.id, el.title, this.reRenderTracks));
                };
            }
          }
          new TrackPr(listEl, el, i, chooseAction, this.reRenderPlayer).renderTrack();
        })
      } else {
        document.querySelector('.tracks').innerHTML = '<h4>В плей-листе нет треков</h4>';
      }
    }
  }
}
