import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import { RefObject, useEffect } from "react";

interface Props {
  isLocked: boolean;
  target: RefObject<HTMLElement>;
}

export const useBodyScrollLock = ({ isLocked, target }: Props) => {
  useEffect(() => {
    if (!target.current) return;

    const { body } = document;
    const header = document.querySelector("#header");

    if (isLocked) {
      const scrollbarW = `${window.innerWidth - body.clientWidth}px`;

      [header].forEach((el) => {
        if (!el) return;

        (el as HTMLElement).style.width = `calc(100% - ${scrollbarW})`;
      });

      body.style.paddingRight = scrollbarW;
      disableBodyScroll(target.current);
    } else {
      if (header) {
        (header as HTMLElement).style.width = "100%";
      }

      [header].forEach((el) => {
        if (!el) return;

        (el as HTMLElement).style.width = "100%";
      });

      body.style.paddingRight = "";
      clearAllBodyScrollLocks();
    }
  }, [isLocked, target]);
};
