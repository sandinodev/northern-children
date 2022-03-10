import NextLink from "next/link";
import { forwardRef, PropsWithChildren } from "react";
import tw, { styled } from "twin.macro";

import { isLinkExternal, parsePublicToLocalHref } from "~/utils";
import { supportsHover } from "~/utils/screens";

interface ButtonStylesExternalProps {
  turquoise?: boolean;
}

interface ButtonSharedProps extends ButtonStylesExternalProps {
  ariaLabel?: string;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  type?: string;
}

interface ButtonProps extends ButtonSharedProps {
  isExternal?: boolean;
  isLink?: boolean;
}

const Wrapper = styled.a<ButtonStylesExternalProps>`
  ${tw`relative inline-flex items-center justify-center max-w-max px-42 py-23 text-xs font-era-mono font-medium uppercase border rounded-full`}

  min-width: 17.5rem;
  transition: background-color 0.25s;

  ${({ turquoise }) => (turquoise ? tw`bg-turquoise` : tw`bg-yellow`)}

  ${supportsHover} {
    &:hover {
      ${tw`bg-white`}
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Button = forwardRef<any, PropsWithChildren<ButtonProps>>(
  ({ ariaLabel, children, isExternal, isLink, ...rest }, ref) => {
    const props = isExternal ? { target: "_blank", rel: "noopener noreferrer", type: undefined } : {};

    return (
      <Wrapper ref={ref} as={isLink ? "a" : "button"} {...rest} {...props} aria-label={ariaLabel}>
        {children}
      </Wrapper>
    );
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BaseButton = forwardRef<any, PropsWithChildren<ButtonSharedProps>>(({ children, href, ...rest }, ref) => {
  const isExternal = isLinkExternal(href);

  return !!href?.length ? (
    <>
      {isExternal ? (
        <Button ref={ref} href={href} {...rest} isExternal isLink>
          {children}
        </Button>
      ) : (
        <NextLink href={parsePublicToLocalHref(href) || ""} scroll={false} passHref>
          <Button ref={ref} {...rest} isLink>
            {children}
          </Button>
        </NextLink>
      )}
    </>
  ) : (
    <Button ref={ref} {...rest}>
      {children}
    </Button>
  );
});
