import tw from "twin.macro";

import { Quote } from "~/components/quote";

import { PostStoryQuoteBlockFragment } from "~/types";

const StyledQuote = tw(Quote)`mt-42 mb-100`;

export const QuoteBlock = ({ quote }: PostStoryQuoteBlockFragment) => {
  if (!quote?.length) return null;

  return <StyledQuote {...quote[0]} />;
};
