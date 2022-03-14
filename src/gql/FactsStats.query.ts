import gql from "graphql-tag";

import {
  FACTS_STATS_IMAGE_BLOCK_FRAGMENT,
  FACTS_STATS_RICH_TEXT_BLOCK,
  FACTS_STATS_TEXT_WITH_BACKGROUND_BLOCK_FRAGMENT,
} from "~/components/factsStats";

import { SEO_FRAGMENT } from "~/components/seo";

import { ASSET_FRAGMENT } from "./Fragments.fragment";

export const FACTS_STATS_QUERY = gql`
  query FactsStats {
    facts: entry(slug: "facts-stats") {
      ... on factsStats_factsStats_Entry {
        blocks: factsStatsBlocks {
          ...FactsStatsImageBlock
          ...FactsStatsRichTextBlock
          ...FactsStatsTextWithBackgroundBlock
        }
        color
        heroImage: image {
          ...Asset
        }
        seo {
          ...Seo
        }
        title
      }
    }
  }

  ${ASSET_FRAGMENT}
  ${FACTS_STATS_IMAGE_BLOCK_FRAGMENT}
  ${FACTS_STATS_RICH_TEXT_BLOCK}
  ${FACTS_STATS_TEXT_WITH_BACKGROUND_BLOCK_FRAGMENT}
  ${SEO_FRAGMENT}
`;
