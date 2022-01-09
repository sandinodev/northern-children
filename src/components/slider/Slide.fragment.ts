import gql from "graphql-tag";

import { ASSET_FRAGMENT } from "~/gql/Fragments.fragment";

export const SLIDE_FRAGMENT = gql`
  fragment Slide on slides_slide_BlockType {
    bg
    image {
      ...Asset
    }
    text
  }

  ${ASSET_FRAGMENT}
`;
