import { TextBlock } from "~/components/text";

import { FactsStatsTextWithBackgroundBlockFragment } from "~/types";

export const TextWithBackgroundBlock = ({ text }: FactsStatsTextWithBackgroundBlockFragment) => {
  if (!text?.length) return null;

  return <TextBlock bg="red" text={text} />;
};
