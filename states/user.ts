import { create } from 'zustand';

interface UserState {
  userInfo?: UserInfo;
}

interface UserActions {
  reset: () => void;
  setUserInfo: (userInfo: UserInfo) => void;
}

const initialState: UserState = {
  userInfo: undefined,
};

export const useUser = create<UserState & UserActions>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  setUserInfo: (userInfo) => set({ userInfo }),
}));
