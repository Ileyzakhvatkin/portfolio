import { User } from '../utils/types';
import { HeaderTmpl } from './../layuot/HeaderTmpl';

export class HeaderPr {

  constructor(demoUser: User, private setSearch: (search: string) => void, private reRenderTracks: () => void) {

    const header = new HeaderTmpl(demoUser);
    document.querySelector('.header').innerHTML = header.getTemplate();

    const inputSearch = (e: InputEvent) => {
      this.setSearch((e.target as HTMLInputElement).value);
      setTimeout(() => {
        this.reRenderTracks();
      }, 700);
    };

    header.onInput('.header__search__field', inputSearch);
  }

}
