import gql from "graphql-tag";

import { ASSET_FRAGMENT } from "~/gql/Fragments.fragment";

export const FACTS_STATS_IMAGE_BLOCK_FRAGMENT = gql`
  fragment FactsStatsImageBlock on factsStatsBlocks_image_BlockType {
    image {
      ...Asset
    }
    type: typeHandle
  }

  ${ASSET_FRAGMENT}
`;
