import gql from "graphql-tag";

export const GLOBALS_QUERY = gql`
  query Globals {
    footer: globalSet(id: "2") {
      ... on footer_GlobalSet {
        cta: text
        address: textWithLineBreaks
      }
    }

    socials: globalSet(id: "3") {
      ... on socials_GlobalSet {
        links {
          ... on links_item_BlockType {
            link: itemLink {
              text
              url
            }
          }
        }
      }
    }
  }
`;
