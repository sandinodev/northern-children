import gql from "graphql-tag";

export const TEXT_MESSAGE_FRAGMENT = gql`
  fragment TextMessage on message_message_BlockType {
    caption
    subtitle
    text
    title: titleMessage
  }
`;
