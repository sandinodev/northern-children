import gql from "graphql-tag";

export const FACTS_STATS_TEXT_WITH_BACKGROUND_BLOCK_FRAGMENT = gql`
  fragment FactsStatsTextWithBackgroundBlock on factsStatsBlocks_textWithBackground_BlockType {
    text: textWithLineBreaks
    type: typeHandle
  }
`;
