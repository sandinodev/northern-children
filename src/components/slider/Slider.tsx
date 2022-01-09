import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade } from "swiper";
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

export const Slider = ({ interval = 5, slides, ...rest }: Props) => {
  if (!slides.length) return null;

  return (
    <Wrapper {...rest}>
      <StyledSwiper
        autoplay={{ delay: interval * 1000, disableOnInteraction: false }}
        effect="fade"
        followFinger={false}
        slidesPerView={1}
        spaceBetween={0}
        loop
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <HeroSplit {...slide} />
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </Wrapper>
  );
};
