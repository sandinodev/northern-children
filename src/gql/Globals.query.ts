import gql from "graphql-tag";

import { CTA_FRAGMENT } from "~/components/cta";

export const GLOBALS_QUERY = gql`
  query Globals {
    footer: globalSet(id: "2") {
      ... on footer_GlobalSet {
        cta {
          ...Cta
        }
        address: textWithLineBreaks
      }
    }

    socials: globalSet(id: "3") {
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

  ${CTA_FRAGMENT}
`;
