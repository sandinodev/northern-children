import gql from "graphql-tag";

export const SERVICES_SLUGS_QUERY = gql`
  query ServicesSlugs {
    services: entries {
      ... on services_service_Entry {
        slug
      }
    }
  }
`;
