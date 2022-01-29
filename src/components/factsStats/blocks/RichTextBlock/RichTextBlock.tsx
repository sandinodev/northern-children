import tw, { styled } from "twin.macro";

import { BaseContainer, BaseRichText, BaseWrapper } from "~/components/base";

import { FactsStatsRichTextBlockFragment } from "~/types";

const StyledRichText = styled(BaseRichText)`
  ${tw`col-span-full lg:col-span-6 mt-80 mb-100`}

  h2 {
    ${tw`mb-68 text-red text-2xl font-alpina`}

    width: 120%;
  }

  h3 {
    ${tw`mb-52 text-md`}
  }

  ol {
    ${tw`list-inside`}

    counter-reset: list;

    & > li {
      ${tw`mb-27`}

      list-style: none;

      &:before {
        content: "[" counter(list) "] ";
        counter-increment: list;
      }
    }
  }

  ul {
    ${tw`mb-72 list-disc list-inside`}

    li {
      ${tw`mb-27`}
    }
  }
`;

export const RichTextBlock = ({ text }: FactsStatsRichTextBlockFragment) => {
  return (
    <BaseWrapper>
      <BaseContainer>
        <StyledRichText text={text} />
      </BaseContainer>
    </BaseWrapper>
  );
};
