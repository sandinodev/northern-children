import { Quote } from "~/components/quote";

import { PostStoryQuoteBlockFragment } from "~/types";

export const QuoteBlock = ({ quote }: PostStoryQuoteBlockFragment) => {
  if (!quote?.length) return null;

  return <Quote {...quote[0]} />;
};
