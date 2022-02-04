import { mapValues } from "lodash";
import { useMemo } from "react";

import { Store, useStore } from "~/store";

import { screens } from "~/utils/screens";

const screensUnitless = mapValues(screens, (v: string) => Number(v?.replace?.("px", "")));

const storeSelector = (state: Store) => state.wW;

export const useBreakpoints = () => {
  const wW = useStore(storeSelector);

  const breakpoints = useMemo(() => {
    return Object.entries(screensUnitless).reduce((acc: { [key: string]: boolean }, [key, value]) => {
      acc[key] = wW >= value;
      return acc;
    }, {});
  }, [wW]);

  return breakpoints;
};
