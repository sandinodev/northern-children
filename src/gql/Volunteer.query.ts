import gql from "graphql-tag";

import { SEO_FRAGMENT } from "~/components/seo";

import { ASSET_FRAGMENT, LINK_FRAGMENT } from "./Fragments.fragment";

export const VOLUNTEER_QUERY = gql`
  query Volunteer {
    volunteer: entry(slug: "volunteer") {
      ... on volunteer_volunteer_Entry {
        color
        description: textWithLineBreaks
        image {
          ...Asset
        }
        imageMobile {
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
