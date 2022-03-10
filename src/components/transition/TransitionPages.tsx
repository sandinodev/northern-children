import { gsap } from "gsap";
import { useRouter } from "next/router";
import { useRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import tw from "twin.macro";

import { Donate } from "~/components/donate";
import { Footer } from "~/components/footer";

interface Props {}

const Wrapper = tw.div`flex flex-col flex-1 bg-white-greenish`;

export const TransitionPages: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  const refs = {
    root: useRef<HTMLDivElement>(null),
  };

  const onEnter = () => {
    gsap.fromTo(refs.root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "power2.out", delay: 0.15 });
  };

  const onExit = () => {
    gsap.to(refs.root.current, { autoAlpha: 0, duration: 0.3, ease: "power2.out" });
  };

  const onExited = () => {
    window.scrollTo(0, 0);
  };

  return (
    <SwitchTransition>
      <Transition
        key={router.asPath}
        in={true}
        nodeRef={refs.root}
        onEnter={onEnter}
        onExit={onExit}
        onExited={onExited}
        timeout={{
          enter: 450,
          exit: 350,
        }}
        mountOnEnter
        unmountOnExit
      >
        <Wrapper ref={refs.root}>
          {children}

          <Donate />
          <Footer />
        </Wrapper>
      </Transition>
    </SwitchTransition>
  );
};
