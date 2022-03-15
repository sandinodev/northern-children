import gql from "graphql-tag";

import { PROGRAM_FRAGMENT } from "~/components/programs";
import { SEO_FRAGMENT } from "~/components/seo";

import { ASSET_FRAGMENT, LINK_FRAGMENT } from "./Fragments.fragment";

export const SERVICE_QUERY = gql`
  query Service($slug: [String!]) {
    service: entry(slug: $slug, type: "service") {
      ... on services_service_Entry {
        color
        description: textWithLineBreaks
        image {
          ...Asset
        }
        imageMobile {
          ...Asset
        }
        programs {
          ...Program
        }
        seo {
          ...Seo
        }
        title
      }
    }
  }

  ${ASSET_FRAGMENT}
  ${LINK_FRAGMENT}
  ${PROGRAM_FRAGMENT}
  ${SEO_FRAGMENT}
`;
