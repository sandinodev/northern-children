import tw, { styled } from "twin.macro";

import { WRAPPER_PADDING } from "~/constants";

import { up } from "~/utils/screens";

interface Props {
  mb?: boolean;
}

export const BaseWrapper = styled.section<Props>`
  padding: 0 ${WRAPPER_PADDING.min}px;

  ${up("lg")} {
    padding: 0 ${WRAPPER_PADDING.max}px;
  }

  ${({ mb }) => mb && tw`mb-200`}
`;
