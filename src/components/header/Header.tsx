import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import tw, { css, styled } from "twin.macro";

import LogoSVG from "~/assets/svg/logo.svg";

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

const Link = styled.li`
  ${tw`opacity-25`}

  transition: opacity 0.35s;

  &:hover {
    ${tw`opacity-100`}
  }
`;

const Links = styled.ul`
  ${tw`absolute top-full left-0 opacity-0 invisible`}

  transition: opacity 0.35s, visibility 0s 0.35s;

  &:not(:hover) {
    ${Link} {
      ${tw`opacity-100`}
    }
  }
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

const MenuIcon = styled.div<{ isClose: boolean }>`
  ${tw`inline-block`}

  ${({ isClose }) =>
    isClose &&
    css`
      ${Burger} {
        transform: scaleX(1.1);
      }
    `}
`;

const Burger = styled.div`
  ${tw`w-24 h-21`}

  transition: transform 0.3s ${eases.sine.out};
`;

const Line = tw.div`w-full h-3 mb-6 last:mb-0 bg-black origin-center`;

const storeSelector = ({ isMenuOpen, setIsMenuOpen }: Store) => ({ isMenuOpen, setIsMenuOpen });

export const Header = () => {
  const refs = {
    burger: useRef<HTMLDivElement>(null),
    tl: useRef<GSAPTimeline>(),
  };

  const { isMenuOpen, setIsMenuOpen } = useStore(storeSelector);

  const [currI, setCurrI] = useState(-1);

  const onMouseEnter = (i: number) => {
    return () => {
      setCurrI(i);
    };
  };

  const onMouseLeave = () => setCurrI(-1);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    if (!refs.burger.current) return;
    const lines = refs.burger.current.children;

    refs.tl.current = gsap
      .timeline({ paused: true })
      .to(lines[0], { y: "0.9rem", duration: 0.15, ease: "sine.out" }, 0)
      .to(lines[2], { y: "-0.9rem", duration: 0.15, ease: "sine.out" }, 0)
      .set(lines[2], { autoAlpha: 0 })
      .addLabel("close")
      .to(lines[0], { rotate: 45, duration: 0.15, ease: "sine.out" }, "close")
      .to(lines[1], { y: "-25%", rotate: -45, duration: 0.15, ease: "sine.out" }, "close");
  }, [refs.burger, refs.tl]);

  useEffect(() => {
    if (!refs.tl.current) return;

    isMenuOpen ? refs.tl.current.play() : refs.tl.current.reverse();
  }, [isMenuOpen, refs.tl]);

  return (
    <Wrapper id="header" as="header" i={currI}>
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
                  <Link key={j}>
                    <StyledBaseLink href={href}>
                      {text == "Mission & Vision" ? "Mission & Values" : text}
                    </StyledBaseLink>
                  </Link>
                ))}
              </Links>
            </Group>
          ))}

          <StyledBaseLink href="/join">Join our Team</StyledBaseLink>
        </Items>

        <Menu onClick={toggleMenu}>
          <MenuIcon isClose={isMenuOpen}>
            <Burger ref={refs.burger}>
              <Line />
              <Line />
              <Line />
            </Burger>
          </MenuIcon>
        </Menu>
      </Container>
    </Wrapper>
  );
};
