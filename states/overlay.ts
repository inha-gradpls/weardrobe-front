import { ReactNode } from 'react';
import { create } from 'zustand';

interface OverlayState {
  overlay?: ReactNode;
}

interface OverlayActions {
  setOverlay: (overlay?: ReactNode) => void;
}

export const useOverlay = create<OverlayState & OverlayActions>((set) => ({
  overlay: undefined,
  setOverlay: (overlay) => set({ overlay }),
}));
