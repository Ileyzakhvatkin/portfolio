import { BlockTmpl } from "./Abstracts/BlockTmpl";

export class PlayListsTmpl extends BlockTmpl {

  public getTemplate(): string {
    return `
      <h2 class="playlist__h2 visually-hidden">Плейлисты</h2>
      <ul class="playlist__list">

      </ul>
    `
  }
}
