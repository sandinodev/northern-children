import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import tw, { css, styled } from "twin.macro";

import { BaseButton } from "~/components/base";

import { PAGES_WITHOUT_FOOTER } from "~/constants";

import { useMagnetize } from "~/hooks";

import { DataStore, useDataStore } from "~/store/data";
import { eases } from "~/styles/eases";

import { isClient } from "~/utils";
import { down } from "~/utils/screens";

if (isClient) {
  gsap.registerPlugin(ScrollTrigger);
}

const Wrapper = styled.section<{ isVisible: boolean }>`
  ${tw`fixed bottom-40 lg:bottom-60 lg:right-20 z-donate`}

  transition: opacity 0.85s ${eases.sine.out}, visibility 0s 0s;

  ${down("lg")} {
    ${tw`left-18`}
  }

  ${({ isVisible }) =>
    !isVisible &&
    css`
      ${tw`opacity-0 invisible`}

      transition: opacity 0.25s ${eases.sine.out}, visibility 0s 0.25s;
    `}
`;

const StyledBaseButton = styled(BaseButton)`
  transform: translateZ(0.01px);
`;

const dataStoreSelector = (state: DataStore) => state.donate;

export const Donate = () => {
  const router = useRouter();

  const donate = useDataStore(dataStoreSelector);

  const refs = {
    button: useRef<HTMLLinkElement>(null),
    st: useRef<gsap.plugins.ScrollTriggerInstance>(),
  };

  const hasDonate = useMemo(
    () => !!donate?.pages?.some((page) => router.asPath.includes(page) || (router.asPath === "/" && page === "home")),
    [donate?.pages, router.asPath]
  );

  const hasFooter = useMemo(() => !PAGES_WITHOUT_FOOTER.includes(router.pathname), [router.pathname]);

  const [isFooter, setIsFooter] = useState(false);

  useMagnetize({ disabled: !hasDonate, target: refs.button });

  useEffect(() => {
    if (!hasFooter) return;

    refs.st.current = ScrollTrigger.create({
      trigger: "#footer",
      invalidateOnRefresh: true,
      onToggle: ({ isActive }) => setIsFooter(isActive),
    });

    return () => {
      refs.st.current?.kill();
    };
  }, [hasDonate, hasFooter, refs.st, router.asPath]);
  return (
    <Wrapper isVisible={hasDonate && !isFooter}>
      <StyledBaseButton ref={refs.button} href={donate?.link}>
        Donate
      </StyledBaseButton>
    </Wrapper>
  );
};
