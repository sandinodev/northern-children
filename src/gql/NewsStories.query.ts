import gql from "graphql-tag";

import { SEO_FRAGMENT } from "~/components/seo";

export const NEWS_STORIES_QUERY = gql`
  query NewsStories {
    news: entry(slug: "news-stories") {
      ... on newsStories_newsStories_Entry {
        seo {
          ...Seo
        }
      }
    }
  }

  ${SEO_FRAGMENT}
`;
