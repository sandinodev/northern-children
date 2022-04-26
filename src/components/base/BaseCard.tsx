import { upperFirst } from "lodash";
import { useMemo } from "react";
import tw, { css, styled } from "twin.macro";

import { AssetFragment } from "~/types";
import { MaskOpacity } from "../mask";

import { BaseImage } from "./BaseImage";
import { BaseLink } from "./BaseLink";

interface StylesExternalProps {
  large?: boolean;
}

interface Props extends StylesExternalProps {
  href?: string;
  image?: AssetFragment[];
  subtitle?: string;
  thumbnail?: AssetFragment[];
  title?: string;
}

const StyledMaskOpacity = styled(MaskOpacity)`
  ${tw`grid gap-x-40 w-full h-full bg-white`}
`;

const Image = styled.div`
  ${tw`relative col-span-full mb-20`}

  padding-bottom: 66%;
  transition: opacity 0.3s;
`;

const Title = styled.h3`
  ${tw`overflow-hidden`}

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Subtitle = styled.h4<{ text?: string }>`
  ${tw`col-span-full relative px-10 mb-18 lg:mb-20 text-xs font-era-mono`}

  &:before {
    ${tw`hidden lg:block absolute top-0 left-0 px-10 opacity-0`}

    content: "${({ text }) => text}";
    transform: translateY(120%);
  }

  & > div,
  &:before {
    transition: all 0.3s;
  }
`;

const Wrapper = styled(BaseLink)<StylesExternalProps>`
  ${tw`w-full h-full border border-transparent overflow-hidden`}

  transition: border-color 0.5s;

  &:hover {
    ${tw`border-black`}

    transition: border-color 0.3s;

    ${Image} {
      ${tw`opacity-80`}
    }

    ${Subtitle} {
      div {
        ${tw`opacity-0`}

        transform: translateY(-120%);
      }

      &:before {
        ${tw`opacity-100`}

        transform: translateY(0%);
      }
    }
  }

  ${({ large }) =>
    large
      ? css`
          ${StyledMaskOpacity} {
            ${tw`grid-cols-6`}
          }

          ${Title} {
            ${tw`col-span-full lg:col-span-4 pl-10 mb-40 lg:mb-60`}
          }
        `
      : css`
          ${StyledMaskOpacity} {
            ${tw`grid-cols-3`}
          }

          ${Title} {
            ${tw`col-span-full px-10 mb-40`}
          }
        `}
`;

export const BaseCard = ({ image, subtitle, thumbnail, title, ...rest }: Props) => {
  const _image = useMemo(() => (thumbnail?.length ? thumbnail : image), [image, thumbnail]);
  const _subtitle = useMemo(() => upperFirst(subtitle), [subtitle]);

  return (
    <Wrapper {...rest}>
      <StyledMaskOpacity duration={0.6} start="top center+=40%" noY>
        {!!image?.length && (
          <Image>
            <BaseImage sizes="25vw" absolute fullW fullH {..._image?.[0]} />
          </Image>
        )}

        <Title>{title}</Title>

        <Subtitle text={_subtitle}>
          <div>{_subtitle}</div>
        </Subtitle>
      </StyledMaskOpacity>
    </Wrapper>
  );
};
