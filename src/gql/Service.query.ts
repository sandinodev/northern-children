import gql from "graphql-tag";

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
          ... on programs_program_Entry {
            contactLink {
              ...Link
            }
            description: textWithLineBreaks
            image {
              ...Asset
            }
            subtitle: text
            title
          }
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
  ${SEO_FRAGMENT}
`;
