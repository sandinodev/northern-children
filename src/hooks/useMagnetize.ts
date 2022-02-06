import { gsap } from "gsap";
import { RefObject, useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";

import { Store, useStore } from "~/store";

import { useMousePosition } from "./useMousePosition";

interface Props {
  disabled?: boolean;
  target: RefObject<HTMLElement>;
}

const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
  const a = x1 - x2;
  const b = y1 - y2;

  return Math.hypot(a, b);
};

const storeSelector = ({ wH, wW }: Store) => ({ wH, wW });

export const useMagnetize = ({ disabled = isMobile, target }: Props) => {
  const { wH, wW } = useStore(storeSelector);

  const refs = {
    boundrary: useRef<number>(),
    position: useRef<{ x: number; y: number }>(),
  };

  const { x, y } = useMousePosition();

  useEffect(() => {
    if (!target.current) return;

    const { height, width, x, y } = target.current.getBoundingClientRect();

    refs.position.current = { x: x + width / 2, y: y + height / 2 };
    refs.boundrary.current = width;
  }, [refs.boundrary, refs.position, target, wH, wW]);

  useEffect(() => {
    if (disabled || !refs.boundrary.current || !refs.position.current) return;

    const distance = getDistance(x, y, refs.position.current.x, refs.position.current.y);

    if (distance <= refs.boundrary.current) {
      gsap.to(target.current, {
        x: (x - refs.position.current.x) * 0.225,
        y: (y - refs.position.current.y) * 0.225,
        scale: 1.075,
        transformOrigin: "center",
        duration: 0.4,
        ease: "none",
      });
    } else {
      gsap.to(target.current, { x: 0, y: 0, scale: 1, duration: 0.25, ease: "sine.out", overwrite: true });
    }
  }, [disabled, refs.boundrary, refs.position, target, x, y]);
};
