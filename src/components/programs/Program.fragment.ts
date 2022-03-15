import gql from "graphql-tag";

import { ASSET_FRAGMENT, LINK_FRAGMENT } from "~/gql/Fragments.fragment";

export const PROGRAM_FRAGMENT = gql`
  fragment Program on programs_program_Entry {
    contactLink {
      ...Link
    }
    description: richText
    image {
      ...Asset
    }
    subtitle: text
    title
  }

  ${ASSET_FRAGMENT}
  ${LINK_FRAGMENT}
`;
