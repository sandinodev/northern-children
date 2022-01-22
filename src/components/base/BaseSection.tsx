import { PropsWithChildren } from "react";
import { FlattenSimpleInterpolation } from "styled-components";
import tw, { styled, TwStyle } from "twin.macro";

import { BaseContainer } from "./BaseContainer";
import { BaseWrapper } from "./BaseWrapper";

interface StylesExternalProps {
  titleStyles?: TwStyle | FlattenSimpleInterpolation;
}

interface Props extends StylesExternalProps {
  as?: string;
  gapY?: boolean;
  mb?: boolean;
  title?: string;
}

const Title = styled.h2<StylesExternalProps>`
  ${tw`col-span-full mt-100 mb-68 text-xl font-alpina`}

  ${({ titleStyles }) => titleStyles}
`;

export const BaseSection = ({ as, children, title, titleStyles, ...rest }: PropsWithChildren<Props>) => {
  return (
    <BaseWrapper {...rest}>
      <BaseContainer as={as as never}>
        {!!title?.length && <Title titleStyles={titleStyles}>{title}</Title>}

        {children}
      </BaseContainer>
    </BaseWrapper>
  );
};
