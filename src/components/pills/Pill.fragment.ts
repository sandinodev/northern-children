import gql from "graphql-tag";

export const PILL_FRAGMENT = gql`
  fragment Pill on pills_pill_BlockType {
    bg
    description
    title: titlePill
  }
`;
