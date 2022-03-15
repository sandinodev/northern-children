import tw from "twin.macro";

import { BaseSection, BaseRichText } from "~/components/base";
import { MaskOpacity } from "~/components/mask";

import { TextMessageFragment } from "~/types";

const StyledBaseSection = tw(BaseSection)`pb-100 bg-blue`;

const TitleStyles = tw`lg:col-span-6 mb-68`;

const Content = tw.div`col-span-full lg:col-span-6 row-start-2`;

const Subtitle = tw.h3`mb-40 text-md`;

const StyledBaseRichText = tw(BaseRichText)`mb-80`;

export const TextMessage = ({ caption, subtitle, text, title }: TextMessageFragment) => {
  return (
    <StyledBaseSection title={title} titleStyles={TitleStyles}>
      <Content>
        <MaskOpacity>
          <Subtitle>{subtitle}</Subtitle>
        </MaskOpacity>

        <figure>
          <blockquote>
            <StyledBaseRichText text={text} />
          </blockquote>

          <MaskOpacity as="figcaption">{caption}</MaskOpacity>
        </figure>
      </Content>
    </StyledBaseSection>
  );
};
