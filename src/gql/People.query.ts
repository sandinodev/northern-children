import gql from "graphql-tag";

export const PEOPLE_SLUGS_QUERY = gql`
  query PeopleSlugs {
    people: entries {
      ... on people_person_Entry {
        slug
      }
    }
  }
`;
