export interface LeaderCardData {
  id: string;
  username: string;
  wageredAmount: string;
  rewardAmount: string;
  avatarSrc: string;
  rankIconSrc: string;
  champIconSrc: string;
  rank: 1 | 2 | 3;
}

export interface LeaderboardDecoration {
  id: string;
  src: string;
  width: number;
  height: number;
  wrapperClass: string;
  imageClass: string;
}
