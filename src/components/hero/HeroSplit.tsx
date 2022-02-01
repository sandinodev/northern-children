import tw, { css, styled } from "twin.macro";

import { BaseContainer, BaseImage, BaseWrapper } from "~/components/base";

import { MAIN_PADDING_TOP, WRAPPER_PADDING } from "~/constants";

import { AssetFragment } from "~/types";

import { up } from "~/utils/screens";

interface StylesExternalProps {
  bg?: string;
}

interface Props extends StylesExternalProps {
  image?: AssetFragment[];
  text?: string;
}

const Wrapper = styled(BaseWrapper)<StylesExternalProps>`
  ${tw`lg:h-screen`}

  height: calc(100vh - ${MAIN_PADDING_TOP.min}px);

  &:before {
    ${tw`absolute bottom-0 left-0 w-full h-1 bg-black z-1`}

    content: "";
  }

  ${({ bg }) =>
    bg &&
    css`
      background-color: var(--color-${bg.toLowerCase()});
    `}
`;

const Container = tw(BaseContainer)`lg:h-full`;

const Text = tw.h1`col-span-full lg:col-span-7 flex items-center mt-60 lg:mt-0 text-2xl font-athletics uppercase`;

const Image = styled.div`
  ${tw`col-span-full lg:col-span-5 order-first lg:order-last lg:h-full lg:ml-0`}

  height: 41.95vh;
  margin-left: -${WRAPPER_PADDING.min}px;
  margin-right: -${WRAPPER_PADDING.min}px;

  ${up("lg")} {
    margin-right: -${WRAPPER_PADDING.max}px;
  }
`;

export const HeroSplit = ({ image, text, ...rest }: Props) => {
  return (
    <Wrapper {...rest}>
      <Container fullW>
        <Text>{text}</Text>

        <Image>
          <BaseImage fullH fullW {...image?.[0]} />
        </Image>
      </Container>
    </Wrapper>
  );
};
