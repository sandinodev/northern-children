import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MutableRefObject, RefObject, useEffect, useRef } from "react";

import { isClient } from "~/utils";

if (isClient) {
  gsap.registerPlugin(ScrollTrigger);
}

export const useParallax = (el: RefObject<HTMLElement> | MutableRefObject<RefObject<HTMLElement>[]>) => {
  const refs = {
    items: useRef<RefObject<HTMLElement>[]>([]),
    tls: useRef<GSAPTimeline[]>([]),
  };

  useEffect(() => {
    if (!el) return;

    if (el.current instanceof HTMLElement) {
      refs.items.current.push(el as RefObject<HTMLElement>);
    }

    if (el.current instanceof Array) {
      refs.items.current = el.current;
    }

    refs.items.current.forEach((item, i) => {
      if (!item.current) return;

      const y = "30%";

      refs.tls.current[i] = gsap
        .timeline({
          scrollTrigger: {
            start: 0,
            trigger: item.current,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(item.current, { y: 0 }, { y: `${y}`, ease: "none" });
    });

    return () => {
      if (refs.tls.current.length) {
        refs.tls.current.forEach((tl) => tl.kill());
      }
    };
  }, [el, refs.items, refs.tls]);
};
