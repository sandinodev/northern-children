import tw, { styled } from "twin.macro";

import { BaseRichText } from "~/components/base";

import { PostNewsRichTextBlockFragment } from "~/types";

import { up } from "~/utils/screens";

const StyledRichText = styled(BaseRichText)`
  ${tw`mt-60 lg:mt-80 mb-68`}

  ${up("lg")} {
    margin-bottom: calc(8rem - 1.5em);
  }

  h2 {
    ${tw`font-bold`}

    margin-bottom: 1.5em;
  }

  h3 {
    ${tw`font-bold`}
  }

  ol {
    ${tw`list-decimal list-outside`}

    margin-left: 1em;
    margin-bottom: 1.5em;
  }

  ul {
    ${tw`list-disc list-outside`}

    margin-left: 1em;
    margin-bottom: 1.5em;
  }
`;

export const RichTextBlock = ({ text }: PostNewsRichTextBlockFragment) => {
  return <StyledRichText text={text} />;
};
