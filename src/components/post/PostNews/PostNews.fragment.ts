import gql from "graphql-tag";

import { SEO_FRAGMENT } from "~/components/seo";

import { ASSET_FRAGMENT } from "~/gql/Fragments.fragment";

import { POST_NEWS_IMAGE_BLOCK_FRAGMENT, POST_NEWS_RICH_TEXT_BLOCK } from "./blocks";

export const POST_NEWS_FRAGMENT = gql`
  fragment PostNews on posts_news_Entry {
    bg: color
    blocks: postNewsBlocks {
      ...PostNewsImageBlock
      ...PostNewsRichTextBlock
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
  ${POST_NEWS_IMAGE_BLOCK_FRAGMENT}
  ${POST_NEWS_RICH_TEXT_BLOCK}
  ${SEO_FRAGMENT}
`;
