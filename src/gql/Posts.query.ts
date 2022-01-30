import gql from "graphql-tag";

import { NEWS_CARD_FRAGMENT, STORY_CARD_FRAGMENT } from "~/components/newsStories";

export const POSTS_QUERY = gql`
  query Posts($offset: Int! = 0) {
    posts: entries(limit: 16, offset: $offset, orderBy: "postDate DESC", section: "posts") {
      ...NewsCard
      ...StoryCard
    }
    amount: entryCount(section: "posts")
  }

  ${NEWS_CARD_FRAGMENT}
  ${STORY_CARD_FRAGMENT}
`;

export const POSTS_SLUGS_QUERY = gql`
  query PostsSlugs {
    posts: entries(section: "posts") {
      ... on posts_news_Entry {
        slug
      }
      ... on posts_story_Entry {
        slug
      }
    }
  }
`;
