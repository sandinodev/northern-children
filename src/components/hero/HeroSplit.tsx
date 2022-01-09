import tw, { css, styled } from "twin.macro";

import { BaseContainer, BaseImage, BaseWrapper } from "~/components/base";

import { WRAPPER_PADDING } from "~/constants";

import { AssetFragment } from "~/types";

interface StylesExternalProps {
  bg?: string;
}

interface Props extends StylesExternalProps {
  image?: AssetFragment[];
  text?: string;
}

const Wrapper = styled(BaseWrapper)<StylesExternalProps>`
  ${tw`h-screen`}

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

const Container = tw(BaseContainer)`h-full`;

const Text = tw.h1`col-span-7 flex items-center text-max font-athletics uppercase`;

const Image = styled.div`
  ${tw`col-span-5 border-l`}

  margin-right: -${WRAPPER_PADDING.max}px;
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
