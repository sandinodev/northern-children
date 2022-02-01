import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMemo } from "react";
import tw, { css, styled } from "twin.macro";

import { BaseContainer, BaseImage, BaseWrapper } from "~/components/base";

import { PostNewsFragment, PostNewsImageBlockFragment, PostNewsRichTextBlockFragment } from "~/types";

import { ImageBlock, RichTextBlock } from "./blocks";

dayjs.extend(customParseFormat);

type Block = PostNewsImageBlockFragment | PostNewsRichTextBlockFragment;

const components: { [key: string]: (props: Block) => JSX.Element | null } = {
  image: ImageBlock,
  richText: RichTextBlock,
} as const;

const HeroText = styled(BaseContainer)<{ bg?: string }>`
  ${tw`relative col-span-full pt-200 z-0`}

  ${({ bg }) =>
    bg &&
    css`
      &:before,
      &:after {
        ${tw`absolute left-1/2 w-screen -z-1`}

        content: "";
        background-color: var(--color-${bg.toLowerCase()});
        transform: translateX(-50%);
      }

      &:before {
        ${tw`top-0 h-full`}
      }

      &:after {
        ${tw`-bottom-112 h-112`}
      }
    `}
`;

const Title = tw.h1`col-span-full lg:col-span-7 mb-46 text-lg font-alpina`;

const Date = tw.time`col-span-full mb-80`;

const Image = tw.div`col-span-full lg:col-span-6`;

const Blocks = tw.div`col-span-full lg:col-span-6`;

const PostNewsBlock = ({ block }: { block: Block }) => {
  const Component = block?.type ? components[block.type] : undefined;

  return Component ? <Component {...block} /> : null;
};

export const PostNews = ({ bg, blocks, image, postDate, title }: PostNewsFragment) => {
  const date = useMemo(
    () => ({ long: dayjs(postDate).format("YYYY-MM-DD"), short: dayjs(postDate).format("MM.DD.YY") }),
    [postDate]
  );

  return (
    <>
      <BaseWrapper>
        <BaseContainer>
          <HeroText bg={bg}>
            <Title>{title}</Title>

            <Date aria-label="Posted on" dateTime={date.long}>
              {date.short}
            </Date>
          </HeroText>

          <Image>{!!image?.length && <BaseImage fullW {...image[0]} />}</Image>
        </BaseContainer>
      </BaseWrapper>

      <BaseWrapper>
        <BaseContainer>
          <Blocks>{!!blocks?.length && blocks.map((block, i) => <PostNewsBlock key={i} block={block} />)}</Blocks>
        </BaseContainer>
      </BaseWrapper>
    </>
  );
};
