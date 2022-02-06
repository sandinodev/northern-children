import { useRouter } from "next/router";
import { useMemo, useRef } from "react";
import tw, { styled } from "twin.macro";

import { BaseButton } from "~/components/base";

import { useMagnetize } from "~/hooks";

import { DataStore, useDataStore } from "~/store/data";
import { down } from "~/utils/screens";

const Wrapper = styled.section<{ isVisible: boolean }>`
  ${tw`fixed bottom-40 lg:bottom-60 lg:right-20 z-donate`}

  ${down("lg")} {
    ${tw`left-18`}
  }

  ${({ isVisible }) => !isVisible && tw`opacity-0 invisible`}
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
  };

  const hasDonate = useMemo(
    () =>
      !!donate?.pages?.some((page) => router.pathname.includes(page) || (router.pathname === "/" && page === "home")),
    [donate?.pages, router.pathname]
  );

  useMagnetize({ disabled: !hasDonate, target: refs.button });

  return (
    <Wrapper isVisible={hasDonate}>
      <StyledBaseButton ref={refs.button} href={donate?.link}>
        Donate
      </StyledBaseButton>
    </Wrapper>
  );
};
