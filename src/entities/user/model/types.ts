export const BALANCE_TYPE = {
  GAME_POINTS: 'GAME_POINTS',
  WATCH_POINTS: 'WATCH_POINTS',
} as const;

type BalanceType = (typeof BALANCE_TYPE)[keyof typeof BALANCE_TYPE];

export interface UserBalance {
  value: string;
  balanceType: BalanceType;
}

export interface UserCryptoAddresses {
  btcAddress: string | null;
  ethAddress: string | null;
  ltcAddress: string | null;
}

export interface User {
  id: string;
  email: string;
  username: string;
  profileImgUrl: string;
  createdAt: string;
  isBanned: boolean;
  hasVerifiedRoleOnDiscordGuild: boolean;
  userAuthProvider: string[];
  userCryptoAddresses: UserCryptoAddresses;
  userBalances: UserBalance[];
  userDegencity: null;
  hasPassword: boolean;
}
