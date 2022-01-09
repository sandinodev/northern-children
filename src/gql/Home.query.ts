import gql from "graphql-tag";

import { CTA_FRAGMENT } from "~/components/cta";
import { NEWS_CARD_FRAGMENT, STORY_CARD_FRAGMENT } from "~/components/newsStories";
import { SEO_FRAGMENT } from "~/components/seo";
import { SLIDE_FRAGMENT } from "~/components/slider";

export const HOME_QUERY = gql`
  query Home {
    home: entry(slug: "home") {
      ... on home_home_Entry {
        cta {
          ...Cta
        }
        newsStoriesFeatured {
          ...NewsCard
          ...StoryCard
        }
        newsStoriesLatest {
          ...NewsCard
          ...StoryCard
        }
        slides {
          ...Slide
        }
        interval
        seo {
          ...Seo
        }
      }
    }
  }

  ${CTA_FRAGMENT}
  ${NEWS_CARD_FRAGMENT}
  ${SEO_FRAGMENT}
  ${SLIDE_FRAGMENT}
  ${STORY_CARD_FRAGMENT}
`;
