import gql from "graphql-tag";

export const FACTS_STATS_RICH_TEXT_BLOCK = gql`
  fragment FactsStatsRichTextBlock on factsStatsBlocks_richText_BlockType {
    text: richText
    type: typeHandle
  }
`;
