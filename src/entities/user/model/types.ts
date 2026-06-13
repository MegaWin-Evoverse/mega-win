export interface UserBalance {
  value: string;
  balanceType: 'WATCH_POINTS' | 'GAME_POINTS';
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  profileImgUrl: string;
  createdAt: string;
  isBanned: boolean;
  userBalances: UserBalance[];
  hasPassword: boolean;
}
