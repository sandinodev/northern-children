import gql from "graphql-tag";

import { SEO_FRAGMENT } from "~/components/seo";

import { ASSET_FRAGMENT, LINK_FRAGMENT } from "./Fragments.fragment";

export const INTERNSHIPS_VOLUNTEER_QUERY = gql`
  query InternshipsVolunteer {
    internships: entry(slug: "internships-volunteer") {
      ... on internshipsVolunteer_internshipsVolunteer_Entry {
        description: textWithLineBreaks
        image {
          ...Asset
        }
        seo {
          ...Seo
        }
        tiles {
          ... on tiles_tile_BlockType {
            contactLink {
              ...Link
            }
            description
            image {
              ...Asset
            }
            subtitle
            title: tileTitle
          }
        }
        title
      }
    }
  }

  ${ASSET_FRAGMENT}
  ${LINK_FRAGMENT}
  ${SEO_FRAGMENT}
`;
