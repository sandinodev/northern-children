import tw from "twin.macro";

import { TextBlock } from "~/components/text";

import { FactsStatsTextWithBackgroundBlockFragment } from "~/types";

export interface FactsStatsTextWithBackgroundBlockProps extends FactsStatsTextWithBackgroundBlockFragment {
  color: string;
}

const StyledTextBlock = tw(TextBlock)`mb-40 lg:mb-0`;

export const TextWithBackgroundBlock = ({ color, text }: FactsStatsTextWithBackgroundBlockProps) => {
  if (!text?.length) return null;

  return <StyledTextBlock bg={color} text={text} />;
};
