import create from "zustand";
import { devtools } from "zustand/middleware";

export interface Store {
  areFontsLoaded: boolean;
  setAreFontsLoaded: (v: boolean) => void;
  hasFooter: boolean;
  setHasFooter: (v: boolean) => void;
  hasFooterCTA: boolean;
  setHasFooterCTA: (v: boolean) => void;
  isIntro: boolean;
  setIsIntro: (v: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;
  wH: number;
  setWH: (v: number) => void;
  wW: number;
  setWW: (v: number) => void;
}

export const useStore = create<Store>(
  devtools((set, get) => {
    return {
      areFontsLoaded: false,
      setAreFontsLoaded: (v) => set({ areFontsLoaded: v }),
      hasFooter: true,
      setHasFooter: (v) => set({ hasFooter: v }),
      hasFooterCTA: true,
      setHasFooterCTA: (v) => set({ hasFooterCTA: v }),
      isIntro: true,
      setIsIntro: (v) => set({ isIntro: v }),
      isMenuOpen: false,
      setIsMenuOpen: (v) => set({ isMenuOpen: v }),
      wH: 0,
      setWH: (v) => set({ wH: v }),
      wW: 0,
      setWW: (v) => set({ wW: v }),
    };
  })
);
