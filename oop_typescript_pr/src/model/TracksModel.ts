import { Track } from "./../utils/types";

export class TracksModel {

  private data: Track[] = [];

  public setTracks(tracks: Track[]): void {
    this.data = tracks;
  }

  public getTracks(search: string = null, playListTracks: string[] = []): Track[] {
    if (!search && playListTracks.length === 0) {
        return this.data;
    } else if (!search) {
        return this.data
          .filter((el) => playListTracks.includes(el.id));
    } else if (search && playListTracks.length === 0){
        search = search.toLowerCase();
        return this.data.filter((el) => el.title.toLowerCase().includes(search) || el.author.toLowerCase().includes(search) || el.albom.toLowerCase().includes(search))
    } else {
      search = search.toLowerCase();
      const data = this.data.filter((el) => playListTracks.includes(el.id))
      return data.filter((el) => el.title.toLowerCase().includes(search) || el.author.toLowerCase().includes(search) || el.albom.toLowerCase().includes(search))
    }
  }

  public updateTrack(track: Track): void {
    this.data.filter((el) => el.id === track.id)[0] = track;
  }
}
