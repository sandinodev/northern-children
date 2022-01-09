import tw from "twin.macro";

import { BaseSection, BaseText } from "~/components/base";

import { TextMessageFragment } from "~/types";

const StyledBaseSection = tw(BaseSection)`pb-100 bg-blue`;

const TitleStyles = tw`lg:col-span-6 mb-68`;

const Content = tw.div`col-span-full lg:col-span-6 row-start-2`;

const Subtitle = tw.h3`mb-40 text-md`;

const StyledBaseText = tw(BaseText)`mb-80`;

export const TextMessage = ({ caption, subtitle, text, title }: TextMessageFragment) => {
  return (
    <StyledBaseSection title={title} titleStyles={TitleStyles}>
      <Content>
        <Subtitle>{subtitle}</Subtitle>

        <figure>
          <blockquote>
            <StyledBaseText text={text} />
          </blockquote>

          <figcaption>{caption}</figcaption>
        </figure>
      </Content>
    </StyledBaseSection>
  );
};
