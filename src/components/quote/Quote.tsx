import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import tw, { styled } from "twin.macro";

import { BaseContainer, BaseImage, BaseWrapper } from "~/components/base";
import { MaskOpacity } from "~/components/mask";

import { QuoteFragment } from "~/types";

import { isClient } from "~/utils";

if (isClient) {
  gsap.registerPlugin(ScrollTrigger);
}

const Wrapper = tw(BaseWrapper)`relative overflow-hidden z-0`;

const Container = styled(BaseContainer)`
  ${tw`relative h-screen z-1`}

  transform: translateZ(0.1px);
`;

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

  transform: scale(1.3) translateZ(0.1px);

  &:before {
    ${tw`absolute top-0 left-0 w-full h-full bg-black opacity-30 z-1`}

    content: "";
  }
`;

export const Quote = ({ caption, image, quote, ...rest }: QuoteFragment) => {
  const refs = {
    image: useRef<HTMLDivElement>(null),
    root: useRef<HTMLDivElement>(null),
    st: useRef<gsap.plugins.ScrollTriggerInstance>(),
  };

  useIsomorphicLayoutEffect(() => {
    if (!quote?.length || !refs.root.current || !refs.image.current) return;

    const t = gsap.fromTo(refs.image.current, { scale: 1.3 }, { scale: 1, duration: 0.4, ease: "none", paused: true });

    refs.st.current = ScrollTrigger.create({
      invalidateOnRefresh: true,
      end: "bottom bottom",
      start: "top bottom",
      trigger: refs.root.current,
      onUpdate: ({ progress }) => {
        t.progress(progress);
      },
    });

    return () => {
      refs.st.current?.kill();
      t.kill();
    };
  }, [quote?.length, refs.image, refs.root, refs.st]);

  if (!quote?.length) return null;

  return (
    <Wrapper ref={refs.root} {...rest}>
      <Container>
        <Figure>
          <Blockquote>
            <MaskOpacity as="p">{quote}</MaskOpacity>
          </Blockquote>

          <Caption>
            <MaskOpacity>{caption}</MaskOpacity>
          </Caption>
        </Figure>
      </Container>

      {!!image?.length && (
        <Image ref={refs.image}>
          <BaseImage fullH fullW noMask {...image[0]} />
        </Image>
      )}
    </Wrapper>
  );
};
