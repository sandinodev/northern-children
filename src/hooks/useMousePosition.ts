import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

const state = {
  mouse: { x: 0, y: 0 },
  yOffset: 0,
};

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onMouseMove = ({ pageX, pageY }: MouseEvent) => {
    const { pageYOffset } = window;
    const x = pageX;
    const y = pageY - pageYOffset;

    state.mouse = { x, y };
    state.yOffset = pageYOffset;
    setPosition({ x, y });
  };

  useEffect(() => {
    if (isMobile) return;

    const toggleListeners = (type: string = "add") => {
      const fn = `${type}EventListener`;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (document.body as any)[fn]("mousemove", onMouseMove);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (document.body as any)[fn]("mousedown", onMouseMove);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (document.body as any)[fn]("scroll", onMouseMove);
    };

    toggleListeners();

    return () => {
      toggleListeners("remove");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return position;
};
