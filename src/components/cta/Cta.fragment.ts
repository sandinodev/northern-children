import gql from "graphql-tag";

import { LINK_FRAGMENT } from "~/gql/Fragments.fragment";

export const CTA_FRAGMENT = gql`
  fragment Cta on cta_cta_BlockType {
    ariaLabel
    link: ctaLink {
      ...Link
    }
    text
  }

  ${LINK_FRAGMENT}
`;
