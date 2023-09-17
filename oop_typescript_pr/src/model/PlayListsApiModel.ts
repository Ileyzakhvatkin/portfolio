export class PlayListsApiModel {

  constructor(private token: string) {}

  async getUserPlayList() {
    const response = await fetch(`http://localhost:3000/api/users/playlists`, {
    headers: {
        accept: 'application/json',
        Authorization: `Basic ${this.token}`,
      },
    });
    const data = await response.json();
    return data;
  }
}
