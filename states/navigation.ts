import { create } from 'zustand';

interface NavigationState {
  page: NavigationPage;
}
interface NavigationActions {
  setNavigationPage: (page: NavigationPage) => void;
}

const initialState: NavigationState = {
  page: 'HOME',
};

export const useNavigation = create<NavigationState & NavigationActions>((set) => ({
  ...initialState,
  setNavigationPage: (page) => set({ page }),
}));
