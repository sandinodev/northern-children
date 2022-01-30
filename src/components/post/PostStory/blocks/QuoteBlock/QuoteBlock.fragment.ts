import gql from "graphql-tag";

import { QUOTE_FRAGMENT } from "~/components/quote";

export const POST_STORY_QUOTE_BLOCK = gql`
  fragment PostStoryQuoteBlock on postStoryBlocks_quote_BlockType {
    quote {
      ...Quote
    }
    type: typeHandle
  }

  ${QUOTE_FRAGMENT}
`;
