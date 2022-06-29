import tw from "twin.macro";

import { BaseSection, BaseText, BaseWrapper } from "~/components/base";

interface Props {
  text?: string;
}

const Wrapper = tw(BaseWrapper)`py-60 lg:py-80`;

const StyledBaseText = tw(BaseText)`col-span-full lg:col-span-6 text-md mb-100`;

export const TextHalf2 = ({ text }: Props) => {
  if (!text?.length) return null;

  return (
    <Wrapper>
      <BaseSection title="Our Vision">
        <StyledBaseText text={text} />
      </BaseSection>
    </Wrapper>
  );
};
