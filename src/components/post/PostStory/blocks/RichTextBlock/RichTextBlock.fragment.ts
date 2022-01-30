import gql from "graphql-tag";

export const POST_STORY_RICH_TEXT_BLOCK = gql`
  fragment PostStoryRichTextBlock on postStoryBlocks_richText_BlockType {
    text: richText
    type: typeHandle
  }
`;
