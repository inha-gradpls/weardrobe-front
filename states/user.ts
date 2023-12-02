import { create } from 'zustand';

interface UserState {
  accessToken?: string;
  refreshToken?: string;
  userInfo?: UserInfo;
}

interface UserActions {
  reset: () => void;
  setUserInfo: (userInfo: UserInfo) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
}

const initialState: UserState = {
  accessToken: undefined,
  refreshToken: undefined,
  userInfo: undefined,
};

export const useUser = create<UserState & UserActions>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  setUserInfo: (userInfo) => set({ userInfo }),
  setAccessToken: (token) => set({ accessToken: token }),
  setRefreshToken: (token) => set({ refreshToken: token }),
}));
