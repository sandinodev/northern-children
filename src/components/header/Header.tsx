import { useState } from "react";
import tw, { css, styled } from "twin.macro";

import LogoSVG from "~/assets/svg/logo.svg";
import CloseSVG from "~/assets/svg/icons/close.svg";
import MenuSVG from "~/assets/svg/icons/menu.svg";

import { BaseContainer, BaseLink, BaseWrapper } from "~/components/base";

import { LINKS_GROUPS } from "~/constants";

import { Store, useStore } from "~/store";

import { eases } from "~/styles/eases";

const Wrapper = styled(BaseWrapper)<{ i: number }>`
  ${tw`fixed top-0 left-0 w-full py-20 lg:py-12 bg-white-greenish z-header`}

  &:before {
    ${tw`absolute top-full left-0 w-full bg-white-greenish -z-1`}

    content: "";
    height: 8.8rem;
    transform: scaleY(0);
    transform-origin: top left;
    transition: all 0.4s 0.3s;
  }

  ${({ i }) =>
    i !== -1 &&
    css`
      &:before {
        transform: scaleY(1);
        transition: transform 0.5s, height 0.2s;

        ${i === 1 &&
        css`
          height: 12.4rem;
        `}
      }

      ${Items} {
        &:hover {
          ${Group}:not(:hover), & > ${StyledBaseLink}:not(:hover) {
            ${tw`opacity-50`}
          }
        }
      }
    `}
`;

const Container = tw(BaseContainer)`flex items-center justify-between lg:grid`;

const Logo = tw.div`col-span-2`;

const StyledLogoSVG = styled(LogoSVG)`
  width: 14.7rem;
`;

const Items = styled.ul`
  ${tw`hidden lg:flex col-span-7 items-center justify-end pointer-events-none`}

  grid-column-end: -1;
`;

const Item = css`
  ${tw`inline-flex items-center px-4 py-6 whitespace-nowrap z-1`}

  transition: opacity 0.4s;
  pointer-events: all;
`;

const Button = styled.button`
  ${Item}
`;

const StyledBaseLink = styled(BaseLink)`
  ${Item}
`;

const Links = styled.ul`
  ${tw`absolute top-full left-0 opacity-0 invisible`}

  transition: opacity 0.35s, visibility 0s 0.35s;
`;

const Group = styled.li`
  ${tw`relative mr-80 last:mr-0`}

  transition: opacity 0.4s;
  pointer-events: all;

  &:hover {
    ${Links} {
      ${tw`opacity-100 visible`}

      transition: opacity 0.5s 0.1s, visibility 0s;
    }
  }
`;

const Menu = styled.button`
  ${tw`lg:hidden relative p-5`}
`;

const MenuIcon = styled.span<{ isAbsolute?: boolean; isVisible: boolean }>`
  ${tw`inline-block`}

  transition: opacity 0.35s 0.3s ${eases.sine.out};

  ${({ isAbsolute }) =>
    isAbsolute &&
    css`
      ${tw`absolute top-1/2 left-1/2`}

      transform: translate(-50%, -50%);
    `}

  ${({ isVisible }) =>
    !isVisible &&
    css`
      ${tw`opacity-0`}

      transition-delay: 0s;
    `}
`;

const storeSelector = ({ isMenuOpen, setIsMenuOpen }: Store) => ({ isMenuOpen, setIsMenuOpen });

export const Header = () => {
  const { isMenuOpen, setIsMenuOpen } = useStore(storeSelector);

  const [currI, setCurrI] = useState(-1);

  const onMouseEnter = (i: number) => {
    return () => {
      setCurrI(i);
    };
  };

  const onMouseLeave = () => setCurrI(-1);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Wrapper as="header" i={currI}>
      <Container as="nav" fullW>
        <Logo>
          <BaseLink href="/" block>
            <StyledLogoSVG />
          </BaseLink>
        </Logo>

        <Items>
          {LINKS_GROUPS.map(({ links, title }, i) => (
            <Group key={i} onMouseEnter={onMouseEnter(i)} onMouseLeave={onMouseLeave}>
              <Button aria-haspopup="true" aria-expanded={i === currI} aria-label="Show submenu">
                {title}
              </Button>

              <Links>
                {links.map(({ href, text }, j) => (
                  <li key={j}>
                    <StyledBaseLink href={href}>{text}</StyledBaseLink>
                  </li>
                ))}
              </Links>
            </Group>
          ))}

          <StyledBaseLink href="/join">Join our Team</StyledBaseLink>
        </Items>

        <Menu onClick={toggleMenu}>
          <MenuIcon isVisible={!isMenuOpen}>
            <MenuSVG />
          </MenuIcon>

          <MenuIcon isVisible={isMenuOpen} isAbsolute>
            <CloseSVG />
          </MenuIcon>
        </Menu>
      </Container>
    </Wrapper>
  );
};
