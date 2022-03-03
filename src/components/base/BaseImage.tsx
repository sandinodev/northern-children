import Image, { ImageProps } from "next/image";
import { forwardRef, useMemo, useState } from "react";
import tw, { css, styled } from "twin.macro";

import { Store, useStore } from "~/store";
import { MaskOpacity } from "../mask";

interface StylesProps {
  absolute?: boolean;
  fullH?: boolean;
  fullW?: boolean;
  h?: number;
  originalSize?: boolean;
  w?: number;
}

interface Props extends StylesProps {
  alt?: string;
  className?: string;
  customH?: number;
  kind?: string;
  layout?: ImageProps["layout"];
  noMask?: boolean;
  noPlaceholder?: boolean;
  objectFit?: ImageProps["objectFit"];
  placeholder?: string;
  priority?: boolean;
  quality?: number;
  sizes?: ImageProps["sizes"];
  src?: string;
}

const Wrapper = styled.div<StylesProps>`
  ${tw`relative overflow-hidden`}

  aspect-ratio: ${({ h, w }) => `${w} / ${h}`};

  ${({ absolute }) => absolute && tw`absolute top-0 left-0 w-full h-full`}

  ${({ fullH }) =>
    fullH &&
    css`
      ${tw`h-full min-h-0`}

      div {
        ${tw`h-full`}
      }
    `}

  ${({ fullW }) => fullW && tw`w-full`}

  ${({ originalSize, h, w }) =>
    originalSize &&
    css`
      width: ${w}px;
      height: ${h}px;
    `}

  @supports not (aspect-ratio: 1/1) {
    &:before {
      height: 0;
      content: "";
      padding-bottom: calc(100% / ${({ h = 0, w = 0 }) => `${h / w}`});
    }
  }
`;

const Placeholder = styled.div<{ isHidden: boolean; objectFit: ImageProps["objectFit"] }>`
  ${tw`absolute top-0 left-0 w-full h-full`}

  transition: opacity 0.4s, visibility 0s 0.4s;

  ${({ isHidden }) =>
    isHidden &&
    css`
      ${tw`opacity-0 invisible`}
    `}

  img {
    ${tw`w-full h-full`}

    object-fit: ${({ objectFit }) => objectFit};
    filter: blur(5px);
  }
`;

const storeSelector = (state: Store) => state.wH;

export const BaseImage = forwardRef<HTMLImageElement, Props>(
  (
    {
      alt = "",
      customH = 0,
      h = 0,
      kind: _,
      layout,
      noMask,
      noPlaceholder,
      objectFit = "cover",
      placeholder,
      priority,
      quality = 90,
      sizes,
      src,
      w = 0,
      ...rest
    },
    ref
  ) => {
    const wH = useStore(storeSelector);

    const dimensions = useMemo(() => {
      switch (layout) {
        case "fill":
          return {};
        case "fixed":
          return { height: customH, width: w / (h / customH) };
        default:
          return { height: h || "", width: w || "" };
      }
    }, [customH, h, layout, w]);

    const lazyBoundary = useMemo(() => `${1000 + wH}px`, [wH]);

    const [isLoaded, setIsLoaded] = useState(false);

    const onLoadingComplete = () => setIsLoaded(true);

    if (!src) return null;

    return (
      <Wrapper ref={ref} h={h} w={w} {...rest}>
        <MaskOpacity duration={0.8} manual={noMask} visible={noMask} noY>
          <Image
            alt={alt}
            lazyBoundary={lazyBoundary}
            layout={(layout as never) || "responsive"}
            objectFit={objectFit}
            onLoadingComplete={onLoadingComplete}
            priority={priority}
            sizes={sizes}
            src={src}
            quality={quality}
            {...dimensions}
          />

          {!noPlaceholder && placeholder && (
            <Placeholder isHidden={isLoaded} objectFit={objectFit}>
              <img alt="" src={placeholder} />
            </Placeholder>
          )}
        </MaskOpacity>
      </Wrapper>
    );
  }
);
