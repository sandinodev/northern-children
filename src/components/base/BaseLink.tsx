import NextLink from "next/link";
import tw, { css, styled } from "twin.macro";

import { isLinkExternal, parsePublicToLocalHref } from "~/utils";

interface StylesProps {
  block?: boolean;
  underline?: boolean;
}

interface Props extends StylesProps {
  href?: string;
  onClick?: () => void;
}

const Wrapper = styled.a<StylesProps>`
  ${({ block }) => (block ? tw`block w-min` : tw`inline-flex`)}

  ${({ underline }) =>
    underline &&
    css`
      ${tw`underline`}
    `}
`;

export const BaseLink: React.FC<Props> = ({ children, href, ...rest }) => {
  const isExternal = isLinkExternal(href);

  if (!href) return null;

  return (
    <>
      {isExternal ? (
        <Wrapper href={href} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </Wrapper>
      ) : (
        <NextLink href={parsePublicToLocalHref(href) || href} scroll={false} passHref>
          <Wrapper {...rest}>{children}</Wrapper>
        </NextLink>
      )}
    </>
  );
};
