import gql from "graphql-tag";

export const SHARE_FACEBOOK_FRAGMENT = gql`
  fragment ShareFacebook on share_facebook_BlockType {
    hashtag: textAdditional
    quote: text
    type: typeHandle
  }
`;

export const SHARE_TWITTER_FRAGMENT = gql`
  fragment ShareTwitter on share_twitter_BlockType {
    hashtags: shareHashtags {
      hashtag
    }
    type: typeHandle
  }
`;
