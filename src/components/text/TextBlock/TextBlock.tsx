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

const Text = tw.div`col-span-8 col-start-3 my-144 text-lg text-center font-alpina`;

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
