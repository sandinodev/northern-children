import tw, { styled } from "twin.macro";

interface Props {
  fullW?: boolean;
  gapY?: boolean;
}

export const BaseContainer = styled.div<Props>`
  ${tw`grid grid-cols-12 gap-x-40 mx-auto`}

  ${({ fullW }) => (fullW ? tw`w-full` : tw`max-w-container`)}

  ${({ gapY }) => gapY && tw`gap-y-100`}
`;
