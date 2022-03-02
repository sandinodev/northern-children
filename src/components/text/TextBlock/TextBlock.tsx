import tw, { css, styled } from "twin.macro";

import { BaseContainer, BaseText, BaseWrapper } from "~/components/base";

interface StylesExternalProps {
  bg?: string;
}

interface Props extends StylesExternalProps {
  text?: string;
}

const Wrapper = styled(BaseWrapper)<StylesExternalProps>`
  ${({ bg }) =>
    bg &&
    css`
      background-color: var(--color-${bg.toLowerCase()});
    `}
`;

const Text = styled.div`
  ${tw`col-span-full lg:col-span-8 lg:col-start-3 my-60 lg:my-144 text-lg text-center font-alpina`}

  p {
    ${tw`last:mb-0`}
  }
`;

export const TextBlock = ({ text, ...rest }: Props) => {
  if (!text?.length) return null;

  return (
    <Wrapper {...rest}>
      <BaseContainer>
        <Text>
          <BaseText text={text} />
        </Text>
      </BaseContainer>
    </Wrapper>
  );
};
