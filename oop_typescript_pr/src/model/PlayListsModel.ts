import { PlayList } from "./../utils/types";

export class PlayListsModel {

  private data: PlayList[] = [];

  public setPlayLists(tracks: PlayList[]): void {
    this.data = tracks;
  }

  public getPlayLists(): PlayList[] {
    return this.data;
  }

  public updatePlayList(track: PlayList): void {
    this.data.filter((el) => el.id === track.id)[0] = track;
  }
}
