import gql from "graphql-tag";

import { ASSET_FRAGMENT } from "~/gql/Fragments.fragment";

export const PEOPLE_PERSON_FRAGMENT = gql`
  fragment PeoplePerson on people_person_Entry {
    education: text
    image {
      ...Asset
    }
    name: title
    role: textAdditional
    slug
  }

  ${ASSET_FRAGMENT}
`;
