import gql from "graphql-tag";

import { CTA_FRAGMENT } from "~/components/cta";

import { ASSET_FRAGMENT } from "./Fragments.fragment";

export const GLOBALS_QUERY = gql`
  query Globals {
    footer: globalSet(handle: "footer") {
      ... on footer_GlobalSet {
        cta {
          ...Cta
        }
        address: textWithLineBreaks
      }
    }

    intro: globalSet(handle: "intro") {
      ... on intro_GlobalSet {
        images {
          ...Asset
        }
      }
    }

    socials: globalSet(handle: "socials") {
      ... on socials_GlobalSet {
        links {
          ... on links_item_BlockType {
            link: itemLink {
              text
              url
            }
          }
        }
      }
    }
  }

  ${ASSET_FRAGMENT}
  ${CTA_FRAGMENT}
`;
