import gql from "graphql-tag";

export const POST_NEWS_RICH_TEXT_BLOCK = gql`
  fragment PostNewsRichTextBlock on postNewsBlocks_richText_BlockType {
    text: richText
    type: typeHandle
  }
`;
