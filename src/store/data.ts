import create from "zustand";
import { devtools } from "zustand/middleware";

import { GlobalsQuery } from "~/types";

export interface DataStore {
  footer?: GlobalsQuery["footer"];
  setFooter: (footer?: GlobalsQuery["footer"]) => void;
  socials?: { [key: string]: string };
  setSocials: (socials?: { [key: string]: string }) => void;
}

export const useDataStore = create<DataStore>(
  devtools((set, get) => {
    return {
      footer: undefined,
      setFooter: (footer) => set({ footer }),
      socials: undefined,
      setSocials: (socials) => set({ socials }),
    };
  })
);
