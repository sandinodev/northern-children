import gql from "graphql-tag";

import { ASSET_FRAGMENT } from "~/gql/Fragments.fragment";

export const POST_NEWS_IMAGE_BLOCK_FRAGMENT = gql`
  fragment PostNewsImageBlock on postNewsBlocks_image_BlockType {
    image {
      ...Asset
    }
    type: typeHandle
  }

  ${ASSET_FRAGMENT}
`;
