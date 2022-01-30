import gql from "graphql-tag";

import { SEO_FRAGMENT } from "~/components/seo";

import { ASSET_FRAGMENT } from "~/gql/Fragments.fragment";

import { POST_STORY_QUOTE_BLOCK, POST_STORY_RICH_TEXT_BLOCK } from "./blocks";

export const POST_STORY_FRAGMENT = gql`
  fragment PostStory on posts_story_Entry {
    blocks: postStoryBlocks {
      ...PostStoryQuoteBlock
      ...PostStoryRichTextBlock
    }
    image {
      ...Asset
    }
    postDate
    seo {
      ...Seo
    }
    title
    type: typeHandle
  }

  ${ASSET_FRAGMENT}
  ${POST_STORY_QUOTE_BLOCK}
  ${POST_STORY_RICH_TEXT_BLOCK}
  ${SEO_FRAGMENT}
`;
