import gql from "graphql-tag";

import { PEOPLE_PERSON_FRAGMENT } from "~/components/people";
import { SEO_FRAGMENT } from "~/components/seo";
import { TRUSTEES_TRUSTEE_FRAGMENT } from "~/components/trustees";

export const TEAM_QUERY = gql`
  query Team {
    team: entry(slug: "team") {
      ... on team_team_Entry {
        people {
          ...PeoplePerson
        }
        seo {
          ...Seo
        }
        teamTitle: text
        trusteesTitle: textAdditional
        trustees {
          ...TrusteesTrustee
        }
      }
    }
  }

  ${PEOPLE_PERSON_FRAGMENT}
  ${TRUSTEES_TRUSTEE_FRAGMENT}
  ${SEO_FRAGMENT}
`;
