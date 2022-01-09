import { useEffect } from "react";

import { Store, useStore } from "~/store";

const storeSelector = (state: Store) => state.setAreFontsLoaded;

export const useFontsLoaded = () => {
  const setAreFontsLoaded = useStore(storeSelector);

  useEffect(() => {
    document.fonts.ready.then(() => setAreFontsLoaded(true));
  }, [setAreFontsLoaded]);
};
