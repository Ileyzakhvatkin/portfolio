import { Track } from '../utils/types';
import { TrackElementTmpl } from '../layuot/Elements/TrackElementTmpl';
import { EUserAction } from './../utils/enums';

export class TrackPr {

  private drop: boolean = false;

  constructor(
    private list: HTMLElement,
    private data: Track,
    private index: number,
    private chooseAction: (type: EUserAction) => () => void,
    private reRenderPlayer: () => void
  ) {}

  public renderTrack(): void {

    const trackBox = (new TrackElementTmpl(this.data, this.index));
    const trackDomEl = trackBox.getElement();
    this.list.append(trackDomEl);
    const dropdown: HTMLElement = trackDomEl.querySelector('.track__dropdown');

    const setPlayer = (e: MouseEvent) => {
      e.preventDefault();
      const footer: HTMLElement = document.querySelector('.footer')
      footer.dataset.id = this.data.id;
      this.reRenderPlayer();
    }

    const openDropdown = () => {
      document.querySelectorAll('.track__dropdown').forEach((el: HTMLElement) => el.style.display = 'none');
      this.drop = !this.drop;
      this.drop ? dropdown.style.display = 'flex' : dropdown.style.display = 'none';
    }

    trackBox.onClickEvent('.track__name__link', setPlayer);
    trackBox.onClick('.track__like-btn', this.chooseAction(EUserAction.Like));
    trackBox.onClick('.track__btn-dropdown', openDropdown);
    trackBox.onClick('.track__add-btn', this.chooseAction(EUserAction.AddPL));
    trackBox.onClick('.track__delete-btn', this.chooseAction(EUserAction.DeletePL));

  }
}
