import gql from "graphql-tag";

import { ASSET_FRAGMENT } from "~/gql/Fragments.fragment";

export const QUOTE_FRAGMENT = gql`
  fragment Quote on quote_quote_BlockType {
    caption
    image {
      ...Asset
    }
    quote
  }

  ${ASSET_FRAGMENT}
`;
