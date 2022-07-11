import { useEffect, useRef, useState } from "react";
import AnimateHeight from "react-animate-height";
import tw, { css, styled } from "twin.macro";

import { BaseContainer, BaseLink, BaseWrapper } from "~/components/base";

import { LINKS_GROUPS, MAIN_PADDING_TOP } from "~/constants";
import { useBodyScrollLock } from "~/hooks";

import { Store, useStore } from "~/store";

import { eases } from "~/styles/eases";

const Wrapper = styled(BaseWrapper)<{ isVisible: boolean }>`
  ${tw`lg:hidden fixed top-0 left-0 w-screen h-screen bg-white-greenish z-menu`}

  height: -webkit-fill-available;
  padding-top: ${MAIN_PADDING_TOP.min + 80}px;
  transition: opacity 0.35s ${eases.sine.inOut}, visibility 0s 0s;

  ${({ isVisible }) =>
    !isVisible &&
    css`
      ${tw`opacity-0 invisible`}

      transition: opacity 0.35s ${eases.sine.inOut}, visibility 0s 0.35s;
    `}
`;

const Groups = styled.ul`
  ${tw`col-span-full text-lg`}
`;

const Button = styled.button<{ isCurrent: boolean }>`
  ${tw`py-10`}

  transition: opacity 0.35s;

  ${({ isCurrent }) => !isCurrent && tw`opacity-25`}
`;

const Links = styled(AnimateHeight)`
  ${tw`pl-20`}
`;

const Link = tw.div`my-10`;

const StyledBaseLink = styled(BaseLink)<{ isGray: boolean }>`
  ${tw`mt-10`}

  transition: opacity 0.35s;

  ${({ isGray }) => isGray && tw`opacity-25`}
`;

const storeSelector = ({ isMenuOpen, setIsMenuOpen }: Store) => ({ isMenuOpen, setIsMenuOpen });

export const Menu = () => {
  const { isMenuOpen, setIsMenuOpen } = useStore(storeSelector);
  const [isLoading, setIsLoading] = useState(true);
  const refs = {
    root: useRef<HTMLDivElement>(null),
  };

  const [currI, setCurrI] = useState(-1);

  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  const onButtonClick = (i: number) => {
    return () => {
      if (isLoading === false) {
        if (window.location.href.indexOf("#") !== -1) {
          const _hash = window.location.hash;
          const _messageSection = document.querySelectorAll("main section")[4] as HTMLElement;
          const _historySection = document.querySelectorAll("main section")[6] as HTMLElement;
          if (_hash === "#message" && _messageSection !== undefined) {
            window.scrollTo({ top: _messageSection.offsetTop, left: 0, behavior: "smooth" });
          } else if (_hash === "#history" && _historySection !== undefined) {
            window.scrollTo({ top: _historySection.offsetTop, left: 0, behavior: "smooth" });
          }
        }
      }
      setCurrI(i === currI ? -1 : i);
    };
  };

  const onLinkClick = () => {
    setCurrI(-1);
    setIsMenuOpen(false);
  };

  useBodyScrollLock({ isLocked: isMenuOpen, target: refs.root });

  return (
    <Wrapper ref={refs.root} isVisible={isMenuOpen}>
      <BaseContainer as="nav">
        <Groups>
          {LINKS_GROUPS.map(({ links, title }, i) => (
            <li key={i}>
              <Button
                aria-haspopup="true"
                aria-expanded={i === currI}
                aria-label="Show submenu"
                isCurrent={i === currI || currI === -1}
                onClick={onButtonClick(i)}
              >
                {title}
              </Button>

              <Links duration={350} height={i === currI ? (links.length + 1) * 45 : 0} animateOpacity>
                {links.map(({ href, text }, j) => (
                  <Link key={j}>
                    <BaseLink href={href} onClick={onLinkClick}>
                      {text}
                    </BaseLink>
                  </Link>
                ))}
              </Links>
            </li>
          ))}

          <StyledBaseLink href="/join" isGray={currI !== -1} onClick={onLinkClick}>
            Join our Team
          </StyledBaseLink>
        </Groups>
      </BaseContainer>
    </Wrapper>
  );
};
