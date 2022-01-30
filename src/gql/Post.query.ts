import gql from "graphql-tag";

import { POST_NEWS_FRAGMENT, POST_STORY_FRAGMENT } from "~/components/post";

export const POST_QUERY = gql`
  query Post($slug: [String!]) {
    post: entry(slug: $slug, section: "posts") {
      ...PostNews
      ...PostStory
    }
  }

  ${POST_NEWS_FRAGMENT}
  ${POST_STORY_FRAGMENT}
`;
