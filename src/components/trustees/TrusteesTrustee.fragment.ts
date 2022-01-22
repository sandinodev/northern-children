import gql from "graphql-tag";

export const TRUSTEES_TRUSTEE_FRAGMENT = gql`
  fragment TrusteesTrustee on trustees_TableRow {
    description
    name
    role
  }
`;
