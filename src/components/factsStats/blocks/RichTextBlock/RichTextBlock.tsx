import tw, { styled } from "twin.macro";

import { BaseContainer, BaseRichText, BaseWrapper } from "~/components/base";

import { FactsStatsRichTextBlockFragment } from "~/types";

import { up } from "~/utils/screens";

const StyledRichText = styled(BaseRichText)`
  ${tw`col-span-full lg:col-span-6 mt-40 lg:mt-80 mb-30 lg:mb-100`}

  h2 {
    ${tw`mb-40 lg:mb-68 text-red text-2xl font-alpina`}

    ${up("lg")} {
      width: 120%;
    }
  }

  h3 {
    ${tw`mb-30 lg:mb-52 text-md`}
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
    ${tw`mb-56 lg:mb-72 list-disc list-inside`}

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
