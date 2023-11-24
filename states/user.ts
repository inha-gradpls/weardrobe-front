import { getUserInfo } from '@/utils/api';
import { userInfo } from 'os';
import { create } from 'zustand';

interface UserState {
  accessToken?: string;
  refreshToken?: string;
  userInfo?: UserInfo;
}

interface UserActions {
  reset: () => void;
  setUserInfo: (userInfo: UserInfo) => void;
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
}));
