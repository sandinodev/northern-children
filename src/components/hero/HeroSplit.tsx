import { useMemo } from "react";
import tw, { css, styled } from "twin.macro";

import { BaseContainer, BaseImage, BaseWrapper } from "~/components/base";

import { MAIN_PADDING_TOP, WRAPPER_PADDING } from "~/constants";
import { useBreakpoints } from "~/hooks";

import { AssetFragment } from "~/types";

import { up } from "~/utils/screens";

interface StylesExternalProps {
  bg?: string;
}

interface Props extends StylesExternalProps {
  image?: AssetFragment[];
  imageMobile?: AssetFragment[];
  text?: string;
}

const Wrapper = styled(BaseWrapper)<StylesExternalProps>`
  ${tw`lg:h-screen`}

  height: calc(100vh - ${MAIN_PADDING_TOP.min}px);

  ${({ bg }) =>
    bg &&
    css`
      background-color: var(--color-${bg.toLowerCase()});
    `}
`;

const Container = tw(BaseContainer)`lg:h-screen`;

const Content = styled.div`
  ${tw`col-span-full lg:col-span-7 flex items-center`}
`;

const Text = styled.h1`
  ${tw`w-full mt-60 lg:mt-0 text-2xl font-athletics uppercase`}

  ${up("lg")} {
    max-width: 75rem;
  }
`;

const Image = styled.div`
  ${tw`relative col-span-full lg:col-span-5 order-first lg:order-last lg:h-full lg:ml-0`}

  height: 41.95vh;
  margin-left: -${WRAPPER_PADDING.min}px;
  margin-right: -${WRAPPER_PADDING.min}px;

  ${up("lg")} {
    margin-right: -${WRAPPER_PADDING.max}px;
  }
`;

export const HeroSplit = ({ image, imageMobile, text, ...rest }: Props) => {
  const { lg } = useBreakpoints();

  const _image = useMemo(() => (lg ? image : imageMobile ? imageMobile : image), [image, imageMobile, lg]);

  return (
    <Wrapper {...rest}>
      <Container fullW>
        <Content>
          <Text>{text}</Text>
        </Content>

        <Image>
          <BaseImage absolute fullH fullW {..._image?.[0]} />
        </Image>
      </Container>
    </Wrapper>
  );
};
