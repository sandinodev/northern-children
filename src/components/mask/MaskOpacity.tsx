import { useRef } from "react";
import tw, { css, styled } from "twin.macro";

import { useInView } from "~/hooks";

import { eases } from "~/styles/eases";

interface StylesExternalProps {
  noY?: boolean;
}

interface StylesProps extends StylesExternalProps {
  delay: number;
  duration: number;
  isHidden: boolean;
}

interface Props extends StylesExternalProps {
  as?: string;
  delay?: number;
  duration?: number;
  manual?: boolean;
  start?: string;
  visible?: boolean;
}

const Wrapper = styled.div.attrs(({ isHidden }: StylesProps) => ({
  className: `mask${isHidden ? "" : " mask--is-visible"}`,
}))<StylesProps>`
  transition: all ${({ duration }) => duration}s ${eases.sine.out} ${({ delay }) => delay}s;

  ${({ isHidden, noY }) =>
    isHidden &&
    css`
      ${tw`opacity-0`}

      ${!noY &&
      css`
        transform: translate3d(0, 2rem, 0);
      `}
    `}

  &.mask--is-hidden {
    ${tw`opacity-0`}

    transform: translate3d(0, ${({ noY }) => (noY ? 0 : 2)}rem, 0);
    transition-duration: ${({ duration }) => duration * 0.8}s;
    transition-delay: 0s;
  }
`;

export const MaskOpacity: React.FC<Props> = ({
  as,
  children,
  delay = 0.1,
  duration = 0.5,
  manual,
  start = "center center+=40%",
  visible,
  ...rest
}) => {
  const refs = {
    root: useRef<HTMLDivElement>(null),
  };

  const { isVisible } = useInView({
    start,
    disabled: manual,
    trigger: refs.root,
  });

  return (
    <Wrapper
      as={as as never}
      ref={refs.root}
      delay={delay}
      duration={duration}
      isHidden={!(isVisible || visible)}
      {...rest}
    >
      {children}
    </Wrapper>
  );
};
