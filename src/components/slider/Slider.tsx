import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade } from "swiper";
import { useState } from "react";
import tw, { styled } from "twin.macro";

import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";

import { HeroSplit } from "~/components/hero";

import { SlideFragment } from "~/types";

SwiperCore.use([Autoplay, EffectFade]);

interface StylesExternalProps {
  hScreen?: boolean;
}

interface Props extends StylesExternalProps {
  slides: SlideFragment[];
  interval?: number;
}

const Wrapper = styled.div<StylesExternalProps>`
  ${tw`relative w-full overflow-hidden`}

  ${({ hScreen }) => (hScreen ? tw`h-screen` : tw`h-full`)}
`;

const StyledSwiper = styled(Swiper)`
  ${tw`w-full h-full`}
`;

const StyledHeroSplit = styled(HeroSplit)<{ isHidden: boolean }>`
  ${({ isHidden }) => isHidden && tw`opacity-0`}
`;

export const Slider = ({ interval = 5, slides, ...rest }: Props) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const onInit = () => setIsInitialized(true);

  if (!slides.length) return null;

  return (
    <Wrapper {...rest}>
      <StyledSwiper
        autoplay={{ delay: interval * 1000, disableOnInteraction: false }}
        effect="fade"
        followFinger={false}
        onInit={onInit}
        slidesPerView={1}
        spaceBetween={0}
        loop
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <StyledHeroSplit isHidden={!isInitialized && i !== 0} {...slide} />
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </Wrapper>
  );
};
