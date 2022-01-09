import { styled } from "twin.macro";

import { WRAPPER_PADDING } from "~/constants";

import { up } from "~/utils/screens";

export const BaseWrapper = styled.section`
  padding: 0 ${WRAPPER_PADDING.min}px;

  ${up("lg")} {
    padding: 0 ${WRAPPER_PADDING.max}px;
  }
`;
