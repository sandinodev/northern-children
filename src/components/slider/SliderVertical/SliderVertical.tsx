import { BaseWrapper } from "~/components/base";

import { SliderVerticalSlideFragment } from "~/types";

interface Props {
  slides: SliderVerticalSlideFragment[];
}

export const SliderVertical = ({ slides }: Props) => {
  return <BaseWrapper>slider</BaseWrapper>;
};
