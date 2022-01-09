import { gsap } from "gsap";
import { useRouter } from "next/router";
import { useRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import tw from "twin.macro";

interface Props {}

const Wrapper = tw.div`flex flex-col flex-1 bg-white-greenish`;

export const TransitionPages: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  const refs = {
    root: useRef<HTMLDivElement>(null),
  };

  const onExit = () => {};

  const onExited = () => {
    window.scrollTo(0, 0);
  };

  return (
    <SwitchTransition>
      <Transition
        key={router.asPath}
        in={true}
        nodeRef={refs.root}
        onExit={onExit}
        onExited={onExited}
        timeout={{
          enter: 0,
          exit: 1500,
        }}
        mountOnEnter
        unmountOnExit
      >
        <Wrapper ref={refs.root}>{children}</Wrapper>
      </Transition>
    </SwitchTransition>
  );
};
