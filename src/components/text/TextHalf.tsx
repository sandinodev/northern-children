import tw from "twin.macro";

import { BaseContainer, BaseText, BaseWrapper } from "~/components/base";

interface Props {
  text?: string;
}

const Wrapper = tw(BaseWrapper)`py-80`;

const StyledBaseText = tw(BaseText)`col-span-6 text-md`;

export const TextHalf = ({ text }: Props) => {
  if (!text?.length) return null;

  return (
    <Wrapper>
      <BaseContainer>
        <StyledBaseText text={text} />
      </BaseContainer>
    </Wrapper>
  );
};
