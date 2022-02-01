import gql from "graphql-tag";

import { SEO_FRAGMENT } from "~/components/seo";
import { SHARE_FACEBOOK_FRAGMENT, SHARE_TWITTER_FRAGMENT } from "~/components/share";

import { ASSET_FRAGMENT } from "~/gql/Fragments.fragment";

import { POST_STORY_QUOTE_BLOCK, POST_STORY_RICH_TEXT_BLOCK, POST_STORY_RICH_TEXT_IMAGE_BLOCK } from "./blocks";

export const POST_STORY_FRAGMENT = gql`
  fragment PostStory on posts_story_Entry {
    blocks: postStoryBlocks {
      ...PostStoryQuoteBlock
      ...PostStoryRichTextBlock
      ...PostStoryRichTextImageBlock
    }
    postDate
    seo {
      ...Seo
    }
    share {
      ...ShareFacebook
      ...ShareTwitter
    }
    title
    type: typeHandle
  }

  ${ASSET_FRAGMENT}
  ${POST_STORY_QUOTE_BLOCK}
  ${POST_STORY_RICH_TEXT_BLOCK}
  ${POST_STORY_RICH_TEXT_IMAGE_BLOCK}
  ${SEO_FRAGMENT}
  ${SHARE_FACEBOOK_FRAGMENT}
  ${SHARE_TWITTER_FRAGMENT}
`;
