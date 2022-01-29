import gql from "graphql-tag";

import { LINK_FRAGMENT } from "~/gql/Fragments.fragment";

export const CONTACT_DIRECTORY_ENTRY_FRAGMENT = gql`
  fragment ContactDirectoryEntry on contactDirectory_entry_BlockType {
    email {
      ...Link
    }
    person
    phone
    title: entryTitle
  }

  ${LINK_FRAGMENT}
`;
