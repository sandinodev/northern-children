import gql from "graphql-tag";

import { NEWS_CARD_FRAGMENT, STORY_CARD_FRAGMENT } from "~/components/newsStories";

export const POSTS_QUERY = gql`
  query Posts($offset: Int! = 0) {
    posts: entries(limit: 16, offset: $offset, orderBy: "dateCreated DESC", section: "posts") {
      ...NewsCard
      ...StoryCard
    }
    amount: entryCount(section: "posts")
  }

  ${NEWS_CARD_FRAGMENT}
  ${STORY_CARD_FRAGMENT}
`;
