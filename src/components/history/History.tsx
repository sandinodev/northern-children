import tw from "twin.macro";
import { BaseSection } from "~/components/base";
import { SliderVertical } from "~/components/slider";

import { SliderVerticalSlideFragment } from "~/types";

interface Props {
  slides?: SliderVerticalSlideFragment[];
  title?: string;
}

const Wrapper = tw(BaseSection)`bg-turquoise`;

export const History = ({ slides, title }: Props) => {
  return <Wrapper title={title}>{!!slides?.length && <SliderVertical slides={slides} />}</Wrapper>;
};
