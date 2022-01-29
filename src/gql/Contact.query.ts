import gql from "graphql-tag";

import { CONTACT_DIRECTORY_ENTRY_FRAGMENT } from "~/components/contact";
import { SEO_FRAGMENT } from "~/components/seo";

import { LINK_FRAGMENT } from "./Fragments.fragment";

export const CONTACT_QUERY = gql`
  query Contact {
    contact: entry(slug: "contact") {
      ... on contact_contact_Entry {
        directory: contactDirectory {
          ...ContactDirectoryEntry
        }
        directoryTitle: textAdditional
        email {
          ...Link
        }
        phone {
          ...Link
        }
        seo {
          ...Seo
        }
        title: text
      }
    }
  }

  ${CONTACT_DIRECTORY_ENTRY_FRAGMENT}
  ${LINK_FRAGMENT}
  ${SEO_FRAGMENT}
`;
