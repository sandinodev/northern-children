import React from "react";
import tw, { css, styled } from "twin.macro";

import { MAIN_PADDING_TOP } from "~/constants";

import { down, up } from "~/utils/screens";

interface StylesExternalProps {
  mt?: boolean;
}

interface Props extends StylesExternalProps {}

const Main = styled.main<StylesExternalProps>`
  ${tw`flex-1`}

  ${down("lg")} {
    padding-top: ${MAIN_PADDING_TOP.min}px;
  }

  ${({ mt }) =>
    mt &&
    css`
      ${down("lg")} {
        padding-top: ${MAIN_PADDING_TOP.min + 60}px;
      }

      ${up("lg")} {
        padding-top: ${MAIN_PADDING_TOP.max}px;
      }
    `}
`;

export const DefaultPage: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <>
      <Main {...rest}>{children}</Main>
    </>
  );
};
