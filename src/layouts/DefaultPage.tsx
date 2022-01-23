import React from "react";
import tw, { css, styled } from "twin.macro";
import { MAIN_PADDING_TOP } from "~/constants";
import { up } from "~/utils/screens";

interface StylesExternalProps {
  mt?: boolean;
}

interface Props extends StylesExternalProps {}

const Main = styled.main<StylesExternalProps>`
  ${tw`flex-1`}

  ${({ mt }) =>
    mt &&
    css`
      padding-top: ${MAIN_PADDING_TOP.min}px;

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
