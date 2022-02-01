import gql from "graphql-tag";

import { ASSET_FRAGMENT } from "~/gql/Fragments.fragment";

export const POST_STORY_RICH_TEXT_IMAGE_BLOCK = gql`
  fragment PostStoryRichTextImageBlock on postStoryBlocks_richTextImage_BlockType {
    image {
      ...Asset
    }
    text: richText
    type: typeHandle
  }

  ${ASSET_FRAGMENT}
`;
