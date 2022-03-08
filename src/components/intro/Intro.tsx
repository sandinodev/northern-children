import gsap from "gsap";
import { sampleSize } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import tw, { css, styled } from "twin.macro";

import { BaseWrapper } from "~/components/base";

import { useBodyScrollLock } from "~/hooks";

import { Store, useStore } from "~/store";
import { DataStore, useDataStore } from "~/store/data";

import { eases } from "~/styles/eases";

const Wrapper = styled(BaseWrapper)`
  ${tw`fixed top-0 left-0 w-screen h-screen bg-white-greenish z-intro`}
`;

const Image = styled.div<{ isVisible: boolean }>`
  ${tw`absolute top-1/2 left-1/2`}

  transform: translate(-50%, -50%);
  transition: opacity 0.45s 0.3s ${eases.sine.out};

  ${({ isVisible }) =>
    !isVisible &&
    css`
      ${tw`opacity-0`}

      transition-delay: 0s;
    `}
`;

const dataStoreSelector = (state: DataStore) => state.intro;
const storeSelector = (state: Store) => state.setIsIntro;

export const Intro = () => {
  const intro = useDataStore(dataStoreSelector);
  const setIsIntro = useStore(storeSelector);

  const refs = {
    root: useRef<HTMLDivElement>(null),
    tl: useRef<GSAPTimeline>(),
  };

  const hasImages = useMemo(() => !!intro?.images?.length, [intro?.images?.length]);

  const selectedImages = useMemo(() => (hasImages ? sampleSize(intro?.images, 3) : []), [hasImages, intro?.images]);

  const [currI, setCurrI] = useState(-1);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!refs.root.current || !hasImages) return;

    const v = { i: -1 };

    const onComplete = () => {
      setIsVisible(false);
      setIsIntro(false);
    };
    const onImagesComplete = () => setCurrI(-1);
    const onUpdate = () => setCurrI(v.i);

    gsap
      .timeline({ onComplete })
      .to(v, { i: 3, duration: 3, ease: "steps(4)", onUpdate })
      .add(onImagesComplete, "+=0.3")
      .to(refs.root.current, { autoAlpha: 0, duration: 0.6, ease: "sine.out" }, "-=0.1");
  }, [hasImages, refs.root, setIsIntro]);

  useBodyScrollLock({ isLocked: isVisible, target: refs.root });

  return (
    <Wrapper ref={refs.root}>
      {selectedImages.map((image, i) => (
        <Image key={i} isVisible={i === currI}>
          <img alt="" src={`http://${image.placeholder?.split("https://")[1]}`} />
        </Image>
      ))}
    </Wrapper>
  );
};
