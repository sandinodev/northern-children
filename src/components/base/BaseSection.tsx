import { PropsWithChildren } from "react";
import { FlattenSimpleInterpolation } from "styled-components";
import tw, { styled, TwStyle } from "twin.macro";

import { BaseContainer } from "./BaseContainer";
import { BaseWrapper } from "./BaseWrapper";

interface StylesExternalProps {
  noMt?: boolean;
  titleStyles?: TwStyle | FlattenSimpleInterpolation;
}

interface Props extends StylesExternalProps {
  as?: string;
  border?: boolean;
  gapY?: boolean;
  mb?: boolean;
  title?: string;
}

const Title = styled.h2<StylesExternalProps>`
  ${tw`col-span-full mb-44 lg:mb-68 text-xl font-alpina`}

  ${({ noMt }) => !noMt && tw`mt-80 lg:mt-100`}

  ${({ titleStyles }) => titleStyles}
`;

export const BaseSection = ({ as, children, noMt, title, titleStyles, ...rest }: PropsWithChildren<Props>) => {
  return (
    <BaseWrapper {...rest}>
      <BaseContainer as={as as never}>
        {!!title?.length && (
          <Title noMt={noMt} titleStyles={titleStyles}>
            {title}
          </Title>
        )}

        {children}
      </BaseContainer>
    </BaseWrapper>
  );
};
