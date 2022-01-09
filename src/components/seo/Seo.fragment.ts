import gql from "graphql-tag";

import { ASSET_FRAGMENT } from "~/gql/Fragments.fragment";

export const SEO_FRAGMENT = gql`
  fragment Seo on seo_seo_BlockType {
    description
    image {
      ...Asset
    }
    title: seoTitle
  }

  ${ASSET_FRAGMENT}
`;
