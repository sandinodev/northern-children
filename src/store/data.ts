import create from "zustand";
import { devtools } from "zustand/middleware";

import { GlobalsQuery } from "~/types";

export interface DataStore {
  donate?: { link?: string; pages?: string[] };
  setDonate: (donate?: { link?: string; pages?: string[] }) => void;
  footer?: GlobalsQuery["footer"];
  setFooter: (footer?: GlobalsQuery["footer"]) => void;
  intro?: GlobalsQuery["intro"];
  setIntro: (intro?: GlobalsQuery["intro"]) => void;
  seoDefault?: GlobalsQuery["seoDefault"];
  setSeoDefault: (seoDefault?: GlobalsQuery["seoDefault"]) => void;
  socials?: { [key: string]: string };
  setSocials: (socials?: { [key: string]: string }) => void;
}

export const useDataStore = create<DataStore>(
  devtools((set, get) => {
    return {
      donate: undefined,
      setDonate: (donate) => set({ donate }),
      footer: undefined,
      setFooter: (footer) => set({ footer }),
      intro: undefined,
      setIntro: (intro) => set({ intro }),
      seoDefault: undefined,
      setSeoDefault: (seoDefault) => set({ seoDefault }),
      socials: undefined,
      setSocials: (socials) => set({ socials }),
    };
  })
);
