import tw, { styled } from "twin.macro";

import { BaseContainer, BaseImage, BaseWrapper } from "~/components/base";

import { QuoteFragment } from "~/types";

const Wrapper = tw(BaseWrapper)`relative z-0`;

const Container = tw(BaseContainer)`h-screen`;

const Figure = tw.figure`col-span-full flex flex-col items-center justify-center text-white text-center`;

const Blockquote = styled.blockquote`
  ${tw`mb-52 text-xl font-alpina`}

  p {
    &:before {
      content: "“";
    }

    &:after {
      content: "”";
    }
  }
`;

const Caption = tw.figcaption`text-xs font-era-mono`;

const Image = styled.div`
  ${tw`absolute top-0 left-0 w-full h-full -z-1`}
`;

export const Quote = ({ caption, image, quote }: QuoteFragment) => {
  if (!quote?.length) return null;

  return (
    <Wrapper>
      <Container>
        <Figure>
          <Blockquote>
            <p>{quote}</p>
          </Blockquote>
          <Caption>{caption}</Caption>
        </Figure>
      </Container>

      {!!image?.length && (
        <Image>
          <BaseImage fullH fullW {...image[0]} />
        </Image>
      )}
    </Wrapper>
  );
};
