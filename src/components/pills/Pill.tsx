import tw, { css, styled } from "twin.macro";

import { PillFragment } from "~/types";

const Wrapper = styled.div<{ bg?: string }>`
  ${tw`col-span-full lg:col-span-6 rounded-full`}

  ${({ bg }) =>
    bg &&
    css`
      background-color: var(--color-${bg.toLowerCase()});
    `}
`;

export const Pill = ({ description, title, ...rest }: PillFragment) => {
  return (
    <Wrapper {...rest}>
      {title}
      {description}
    </Wrapper>
  )
};
