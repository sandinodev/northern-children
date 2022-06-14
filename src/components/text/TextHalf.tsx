import tw from "twin.macro";

import { BaseContainer, BaseText, BaseWrapper } from "~/components/base";

interface Props {
  text?: string;
}

const Wrapper = tw(BaseWrapper)`py-60 lg:py-80`;

const StyledBaseText = tw(BaseText)`col-span-full lg:col-span-6 lg:text-md`;

export const TextHalf = ({ text }: Props) => {
  if (!text?.length) return null;

  return (
    <Wrapper>
      <div className="BaseSection__Title-sc-2mfa5o-0 fXORvl">
        <div className="MaskOpacity__Wrapper-pe5v27-0 fDCtjV mask mask--is-visible">Our Vision</div>
      </div>
      <BaseContainer>
        <StyledBaseText text={text} />
      </BaseContainer>
    </Wrapper>
  );
};
