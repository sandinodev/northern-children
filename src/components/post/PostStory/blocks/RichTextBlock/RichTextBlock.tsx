import { PropsWithChildren } from "react";
import tw, { styled } from "twin.macro";

import { BaseContainer, BaseRichText, BaseWrapper } from "~/components/base";

import { PostStoryRichTextBlockFragment } from "~/types";

const StyledRichText = styled(BaseRichText)`
  ${tw`col-span-full lg:col-span-5 mb-100`}

  h2 {
    ${tw`font-bold`}

    margin-bottom: 1.5em;
  }

  h3 {
    ${tw`font-bold`}
  }

  ol {
    ${tw`list-decimal list-inside`}

    margin-bottom: 1.5em;
  }

  ul {
    ${tw`list-disc list-inside`}

    margin-bottom: 1.5em;
  }
`;

export const RichTextBlock = ({ children, text }: PropsWithChildren<PostStoryRichTextBlockFragment>) => {
  return (
    <BaseWrapper>
      <BaseContainer>
        <StyledRichText text={text} />

        {children}
      </BaseContainer>
    </BaseWrapper>
  );
};
