export type Track = {
  id: string;
  title: string;
  author: string;
  albom: string;
  duration: number;
  img: string;
  sreatedAt: string;
  favorites: boolean;
  sound: string;
}

export type PlayList = {
  id: string;
  title: string;
  img: string;
  img360: string;
  img1440: string;
  tracks?: string[];
}

export type User = {
  name: string;
  avatar: string;
}
