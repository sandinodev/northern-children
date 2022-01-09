import gql from "graphql-tag";

export const ASSET_FRAGMENT = gql`
  fragment Asset on assets_Asset {
    alt: title
    h: height
    kind
    placeholder: url @transform(width: 100, quality: 50, immediately: true)
    src: url
    w: width
  }
`;

export const LINK_FRAGMENT = gql`
  fragment Link on linkField_Link {
    text
    type
    url
  }
`;
