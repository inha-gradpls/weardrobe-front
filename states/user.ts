import { getUserInfo } from '@/utils/api';
import { create } from 'zustand';

interface UserState {
  accessToken?: string;
  refreshToken?: string;
  userInfo?: UserInfo;
}

interface UserActions {
  reset: () => void;
  fetch: () => void;
}

const initialState: UserState = {
  accessToken: undefined,
  refreshToken: undefined,
  userInfo: undefined,
};

export const useUser = create<UserState & UserActions>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  fetch: async () => {
    const res = await getUserInfo();
    if (res === undefined) return;
    set({ userInfo: res });
  },
}));
