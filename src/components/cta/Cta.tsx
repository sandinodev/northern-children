import tw, { styled } from "twin.macro";

import { BaseButton, BaseContainer, BaseWrapper } from "~/components/base";

import { CtaFragment } from "~/types";

interface StylesExternalProps {
  yellow?: boolean;
}

interface Props extends CtaFragment, StylesExternalProps {
  turquoise?: boolean;
}

const Wrapper = styled(BaseWrapper)<StylesExternalProps>`
  ${tw`py-144 border-b border-black`}

  ${({ yellow }) => yellow && tw`bg-yellow`}
`;

const Content = tw.div`col-span-6 col-start-4 flex flex-col items-center text-center text-lg-alpina font-alpina`;

const Text = tw.p`mb-64`;

export const Cta = ({ ariaLabel, link, text, turquoise, ...rest }: Props) => {
  return (
    <Wrapper {...rest}>
      <BaseContainer>
        <Content>
          <Text>{text}</Text>

          <BaseButton ariaLabel={ariaLabel} turquoise={turquoise}>
            {link?.text}
          </BaseButton>
        </Content>
      </BaseContainer>
    </Wrapper>
  );
};
