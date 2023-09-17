import { PlayerTmpl } from '../layuot/Elements/PlayerTmpl';
import { TracksModel } from '../model/TracksModel';
import { getFullMinutes } from '../utils/getFullMinutes';
import { checkFile } from '../utils/checkFile';
import { Track } from '../utils/types';

export class FooterPlayerPr {

  private currentNumber: number = 0;
  private pleyStatus: boolean = false;
  private repeatStatus: boolean = false;
  private voluneLavel: number = 0.75;

  constructor(private tracksModel: TracksModel, private currentTracks: string[] | null, private reRenderTracks: () => void) {}

  public renderPlayer() {
    const footer: HTMLElement = document.querySelector('.footer');
    let allTracks: Track[] = this.tracksModel.getTracks();
    this.currentTracks ? allTracks = allTracks.filter((el) => this.currentTracks.includes(el.id)) : allTracks;

    if (footer.dataset.id !== '') this.currentNumber = allTracks.map((el) => el.id).indexOf(footer.dataset.id);
    console.log('num ' + this.currentNumber);
    if (this.currentNumber < 0) this.currentNumber = 0;

    const currentTrack: Track = allTracks[this.currentNumber];
    const player = new PlayerTmpl(currentTrack);
    const playerEl: HTMLDivElement = player.getElement();
    footer.innerHTML = '';
    footer.append(playerEl);

    const audioNode: HTMLMediaElement = footer.querySelector('.player__audio');
    if (!checkFile(currentTrack.sound)) {
      this.pleyStatus = false;
      const playerPlay: HTMLDivElement = playerEl.querySelector('.player__play-btn');
      const playerNofile: HTMLDivElement = playerEl.querySelector('.player__noFile');
      playerPlay.style.display = 'none';
      playerNofile.style.display = 'flex';
    }
    this.pleyStatus ? audioNode.play() : audioNode.pause();
    const volumeBox: HTMLDivElement = footer.querySelector('.player__value-range');
    const volumeBar: HTMLDivElement = footer.querySelector('.player__valume');
    audioNode.volume = this.voluneLavel;
    volumeBar.style.width = `${audioNode.volume * 100}%`;

    const setVolume = (e: MouseEvent) => {
      const el =  e.target as Element;
      const lavel = e.offsetX / el.clientWidth;
      audioNode.volume = lavel;
      volumeBar.style.width = `${lavel * 100}%`;
      this.voluneLavel = lavel;
    }
    volumeBox.addEventListener('click', setVolume);

    const progressBox: HTMLDivElement = footer.querySelector('.player__range-play');
    const progressBar: HTMLDivElement = footer.querySelector('.player__progress');
    audioNode.onloadeddata = () => { document.querySelector('.player__time-end').innerHTML = `${getFullMinutes(audioNode.duration * 1000)}` };
    const btnPlay = playerEl.querySelector('.player__play-btn');
    const btnRepeat = playerEl.querySelector('.player__repeat-btn');
    this.pleyStatus ? btnPlay.classList.add('active') : btnPlay.classList.remove('active');
    this.repeatStatus ? btnRepeat.classList.add('active') : btnRepeat.classList.remove('active');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateProgress = (e: any) => {
      const { duration, currentTime } = e.srcElement;
      progressBar.style.width = `${( currentTime / duration ) * 100}%`;
    }

    audioNode.addEventListener('timeupdate', updateProgress);

    const setProgress = (e: MouseEvent) => {
      audioNode.currentTime = ( e.offsetX / (e.target as Element).clientWidth ) * audioNode.duration;
    }

    progressBox.addEventListener('click', setProgress);


    const likeTrack = () => {
      currentTrack.favorites = !currentTrack.favorites;
      const likeBtn = footer.querySelector('.player__track__like')
      currentTrack.favorites ? likeBtn.classList.add('like-btn--active') : likeBtn.classList.remove('like-btn--active');
      this.tracksModel.updateTrack(currentTrack);
      this.reRenderTracks();
    }

    const shaffTracks = () => {
      this.tracksModel.setTracks(this.tracksModel.getTracks().sort(() => Math.random() - 0.5));
      this.reRenderTracks();
    }

    const skipbackTrack = () => {
      footer.dataset.id = '';
      this.currentNumber === 0 ? this.currentNumber = allTracks.length - 1 : --this.currentNumber;
      this.renderPlayer();
    }

    const playTrack = () => {
      !this.pleyStatus ? audioNode.play() : audioNode.pause();
      this.pleyStatus = !this.pleyStatus;
      this.pleyStatus ? btnPlay.classList.add('active') : btnPlay.classList.remove('active');
    }

    const skipnextTrack = () => {
      footer.dataset.id = '';
      if (!this.repeatStatus) {
        this.currentNumber === allTracks.length - 1 ? this.currentNumber = 0 : ++this.currentNumber;
      } else {
        this.currentNumber;
      }
      this.renderPlayer();
    }

    const repeatTrack = () => {
      this.repeatStatus = !this.repeatStatus;
      this.repeatStatus ? btnRepeat.classList.add('active') : btnRepeat.classList.remove('active');
    }

    audioNode.addEventListener('ended', skipnextTrack)

    player.onClick('.player__track__like', likeTrack);
    player.onClick('.player__shaffle-btn', shaffTracks);
    player.onClick('.player__skipback-btn', skipbackTrack);
    player.onClickEvent('.player__play-btn', playTrack);
    player.onClick('.player__skipnext-btn', skipnextTrack);
    player.onClickEvent('.player__repeat-btn', repeatTrack);

  }
}
