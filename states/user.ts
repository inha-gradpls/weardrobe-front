import { create } from 'zustand';

interface UserState {
  accessToken?: string;
  refreshToken?: string;
}
interface UserActions {
  reset: () => void;
}

const initialState: UserState = {
  accessToken: undefined,
  refreshToken: undefined,
};

export const useUser = create<UserState & UserActions>((set) => ({
  ...initialState,
  reset: () => set(initialState),
}));
