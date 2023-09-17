import './css/style.css';
import { demoTracks } from './data/demoTracks';
import { demoPlayLists } from './data/demoPlayLists';
import { demoUser } from './data/demoUser';
import { HeaderPr } from './presenters/HeaderPr';
import { MenuListPr } from './presenters/MenuListPr';
import { TracksListPr } from './presenters/TracksListPr';
import { PlayListsListPr } from './presenters/PlayListsListPr';
import { FooterPlayerPr } from './presenters/FooterPlayerPr';

import { TracksModel } from './model/TracksModel';
import { PlayListsModel } from './model/PlayListsModel';

// import { Token } from './model/Token';
// const token = (new Token()).getToken();
// console.log(token);

// import { PlayListsApiModel } from './model/PlayListsApiModel';
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsImlkIjoxLCJpYXQiOjE2OTE5MTg1MTMsImV4cCI6MTY5MjUyMzMxM30.Vk5dV5dVt0GBkl5_IkDgpnQ2ikbwOiDmfGPtGkC4Hc4';
// const playListsApiData = new PlayListsApiModel(token);
// console.log(playListsApiData.getUserPlayList());

let currentListID: string = '';
let currentSearch: string = null;

const tracksModelData = new TracksModel;
tracksModelData.setTracks(demoTracks);

const playListsModelData = new PlayListsModel;
playListsModelData.setPlayLists(demoPlayLists);

const setListID = (id: string) => {
  currentListID = id;
}

const setSearch = (search: string) => {
  currentSearch = search;
}

const reRenderTracks = () => {
  if (currentListID !== '') {
    const currentTracks = playListsModelData.getPlayLists().filter((el) => el.id === currentListID)[0].tracks;
    (new TracksListPr(tracksModelData, reRenderTracks, reRenderPlayer)).renderTracks('.tracks__list', currentTracks, currentSearch);
  } else {
    (new TracksListPr(tracksModelData, reRenderTracks, reRenderPlayer)).renderTracks('.tracks__list', [], currentSearch);
  }
}

const reRenderPlayer = () => {
  if (currentListID !== '') {
    const currentTracks = playListsModelData.getPlayLists().filter((el) => el.id === currentListID)[0].tracks;
    (new FooterPlayerPr(tracksModelData, currentTracks, reRenderTracks).renderPlayer());
  } else {
    (new FooterPlayerPr(tracksModelData, null, reRenderTracks).renderPlayer());
  }
}

(new HeaderPr(demoUser, setSearch, reRenderTracks));
(new MenuListPr(playListsModelData, setListID, setSearch, reRenderTracks, reRenderPlayer)).renderMenu('.aside__list');
(new TracksListPr(tracksModelData, reRenderTracks, reRenderPlayer)).renderTracks('.tracks__list', [], currentSearch);
(new PlayListsListPr(playListsModelData, setListID, reRenderTracks, reRenderPlayer)).renderList('.playlist__list');
(new FooterPlayerPr(tracksModelData, null, reRenderTracks).renderPlayer());
