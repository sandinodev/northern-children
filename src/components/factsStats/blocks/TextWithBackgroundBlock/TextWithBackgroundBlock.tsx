import tw from "twin.macro";

import { TextBlock } from "~/components/text";

import { FactsStatsTextWithBackgroundBlockFragment } from "~/types";

const StyledTextBlock = tw(TextBlock)`mb-40 lg:mb-0`;

export const TextWithBackgroundBlock = ({ text }: FactsStatsTextWithBackgroundBlockFragment) => {
  if (!text?.length) return null;

  return <StyledTextBlock bg="red" text={text} />;
};
