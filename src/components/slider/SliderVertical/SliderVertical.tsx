import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import tw, { css, styled } from "twin.macro";

import { BaseContainer, BaseImage, BaseText, BaseWrapper } from "~/components/base";
import { MaskOpacity } from "~/components/mask";

import { useBreakpoints } from "~/hooks";

import { SliderVerticalSlideFragment } from "~/types";

import { isClient } from "~/utils";

if (isClient) {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  slides: SliderVerticalSlideFragment[];
}

const BACKGROUNDS = [tw`bg-turquoise`, tw`bg-yellow`, tw`bg-blue`, tw`bg-red`, tw`bg-violet`];

const Wrapper = styled.section``;

const Slide = styled(BaseWrapper)<{ i: number }>`
  ${tw`relative lg:h-screen pb-100 lg:pb-0`}

  ${({ i }) => css`
    ${BACKGROUNDS[gsap.utils.wrap(0, BACKGROUNDS.length, i)]}
  `}}
  `;

const Container = tw(BaseContainer)`items-start`;

const Title = styled.h3`
  ${tw`col-span-full mt-60 lg:mt-50 mb-40 text-lg`}
`;

const Text = tw.div`col-span-full lg:col-span-7 mb-40 lg:mb-0 lg:text-md`;

const Image = styled.div`
  ${tw`relative col-span-full lg:absolute lg:top-0 lg:right-0 lg:w-2/5 lg:h-full`}
`;

export const SliderVertical = ({ slides }: Props) => {
  const refs = {
    root: useRef<HTMLDivElement>(null),
    sts: useRef<gsap.plugins.ScrollTriggerInstance[]>([]),
  };

  const { lg } = useBreakpoints();

  useEffect(() => {
    if (!lg) {
      return refs.sts.current.forEach((st) => st.kill());
    }

    if (!refs.root.current || refs.sts.current.length) return;

    const slides = refs.root.current.querySelectorAll(".slider-vertical__slide");
    const slidesAmount = slides.length - 1;

    [...slides].forEach((slide, i) => {
      const isLast = i === slidesAmount;
      const slideContainer = slide.querySelector(".slider-vertical__slide-container");
      const tween = isLast
        ? undefined
        : gsap.to(slideContainer, { autoAlpha: 0, duration: 1, ease: "none", paused: true });

      refs.sts.current.push(
        ScrollTrigger.create({
          trigger: slide,
          start: "top top",
          end: isLast ? "top bottom" : "bottom top",
          endTrigger: isLast ? "footer" : slide,
          anticipatePin: 1,
          pin: true,
          pinSpacing: false,
          onUpdate: ({ progress }) => {
            if (progress >= 0.5 && tween) {
              tween.progress(gsap.utils.normalize(0.5, 1, progress));
            }
          },
        })
      );
    });

    return () => {
      refs.sts.current.forEach((st) => st.kill());
    };
  }, [lg, refs.root, refs.sts]);

  if (!slides.length) return null;

  return (
    <Wrapper ref={refs.root}>
      {slides.map(({ image, text, title }, i) => (
        <Slide key={i} className="slider-vertical__slide" i={i}>
          <Container className="slider-vertical__slide-container">
            <Title>
              <MaskOpacity>{title}</MaskOpacity>
            </Title>
            <Text>
              <BaseText text={text} />
            </Text>

            <Image>
              <BaseImage absolute={lg} fullH={lg} fullW {...image?.[0]} />
            </Image>
          </Container>
        </Slide>
      ))}
    </Wrapper>
  );
};
