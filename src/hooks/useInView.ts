import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "react-use";

import { Store, useStore } from "~/store";

import { isClient } from "~/utils";

import { useMounted } from "./useMounted";

if (isClient) {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  disabled?: boolean;
  once?: boolean;
  start?: string;
  trigger: RefObject<HTMLElement>;
  waitForIntro?: boolean;
}

const storeSelector = (state: Store) => state.isIntro;

export const useInView = ({ disabled, once = true, start = "top bottom", trigger, waitForIntro = true }: Props) => {
  const isIntro = useStore(storeSelector);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const refs = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    st: useRef<any>(),
  };

  const isMounted = useMounted();

  useIsomorphicLayoutEffect(() => {
    if (!isMounted || disabled || (waitForIntro && isIntro) || !trigger.current) return;

    refs.st.current = ScrollTrigger.create({
      once,
      start,
      invalidateOnRefresh: true,
      trigger: trigger.current,
      onEnter: () => {
        setIsVisible(true);
      },
    });

    return () => {
      refs.st.current && refs.st.current.kill();
    };
  }, [disabled, isIntro, isMounted, once, refs.st, trigger, waitForIntro]);

  return { isVisible };
};
