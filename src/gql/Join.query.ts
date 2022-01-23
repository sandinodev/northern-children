import gql from "graphql-tag";

import { CTA_FRAGMENT } from "~/components/cta";
import { QUOTE_FRAGMENT } from "~/components/quote";
import { SEO_FRAGMENT } from "~/components/seo";

import { ASSET_FRAGMENT } from "./Fragments.fragment";

export const JOIN_QUERY = gql`
  query Join {
    join: entry(slug: "join") {
      ... on join_join_Entry {
        cta {
          ...Cta
        }
        description: textAdditional
        descriptionBg: color
        heroText: text
        image {
          ...Asset
        }
        quote {
          ...Quote
        }
        seo {
          ...Seo
        }
        text: textWithLineBreaks
      }
    }
  }

  ${ASSET_FRAGMENT}
  ${CTA_FRAGMENT}
  ${QUOTE_FRAGMENT}
  ${SEO_FRAGMENT}
`;
