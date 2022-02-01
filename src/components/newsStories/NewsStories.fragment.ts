import gql from "graphql-tag";

import { ASSET_FRAGMENT } from "~/gql/Fragments.fragment";

export const NEWS_CARD_FRAGMENT = gql`
  fragment NewsCard on posts_news_Entry {
    image {
      ...Asset
    }
    thumbnail {
      ...Asset
    }
    slug
    title
    type: typeHandle
  }

  ${ASSET_FRAGMENT}
`;

export const STORY_CARD_FRAGMENT = gql`
  fragment StoryCard on posts_story_Entry {
    thumbnail {
      ...Asset
    }
    slug
    title
    type: typeHandle
  }

  ${ASSET_FRAGMENT}
`;
