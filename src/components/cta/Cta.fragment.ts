import gql from "graphql-tag";

import { LINK_FRAGMENT } from "~/gql/Fragments.fragment";

export const CTA_FRAGMENT = gql`
  fragment Cta on cta_cta_BlockType {
    links: children {
      ... on cta_link_BlockType {
        ariaLabel: text
        link: baseLink {
          ...Link
        }
      }
    }
    text
  }

  ${LINK_FRAGMENT}
`;
