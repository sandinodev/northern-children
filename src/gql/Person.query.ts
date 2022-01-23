import gql from "graphql-tag";

import { SEO_FRAGMENT } from "~/components/seo";

import { ASSET_FRAGMENT } from "./Fragments.fragment";

export const PERSON_QUERY = gql`
  query Person($slug: [String!]) {
    person: entry(slug: $slug, type: "person") {
      ... on people_person_Entry {
        description: textWithLineBreaks
        education: text
        image {
          ...Asset
        }
        name: title
        role: textAdditional
        seo {
          ...Seo
        }
      }
    }
  }

  ${ASSET_FRAGMENT}
  ${SEO_FRAGMENT}
`;
