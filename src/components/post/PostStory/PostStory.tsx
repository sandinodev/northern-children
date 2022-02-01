import tw from "twin.macro";

import { BaseContainer, BaseWrapper } from "~/components/base";

import { PostStoryFragment, PostStoryQuoteBlockFragment, PostStoryRichTextBlockFragment } from "~/types";

import { QuoteBlock, RichTextBlock, RichTextImageBlock } from "./blocks";

type Block = PostStoryQuoteBlockFragment | PostStoryRichTextBlockFragment;

const components: { [key: string]: (props: Block) => JSX.Element | null } = {
  quote: QuoteBlock,
  richText: RichTextBlock,
  richTextImage: RichTextImageBlock,
} as const;

const Title = tw.h1`col-span-full lg:col-span-10 lg:col-start-2 lg:mt-200 lg:mb-224 text-center text-xl font-alpina`;

const PostStoryBlock = ({ block }: { block: Block }) => {
  const Component = block?.type ? components[block.type] : undefined;

  return Component ? <Component {...block} /> : null;
};

export const PostStory = ({ blocks, title }: PostStoryFragment) => {
  return (
    <>
      <BaseWrapper>
        <BaseContainer as="hgroup">
          <Title>{title}</Title>
        </BaseContainer>
      </BaseWrapper>

      {!!blocks?.length && blocks.map((block, i) => <PostStoryBlock key={i} block={block} />)}
    </>
  );
};
