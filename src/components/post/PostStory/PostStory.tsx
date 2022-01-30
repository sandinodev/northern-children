import { PostStoryFragment, PostStoryQuoteBlockFragment, PostStoryRichTextBlockFragment } from "~/types";

import { QuoteBlock, RichTextBlock } from "./blocks";

type Block = PostStoryQuoteBlockFragment | PostStoryRichTextBlockFragment;

const components: { [key: string]: (props: Block) => JSX.Element | null } = {
  quote: QuoteBlock,
  richText: RichTextBlock,
} as const;

const PostStoryBlock = ({ block }: { block: Block }) => {
  const Component = block?.type ? components[block.type] : undefined;

  return Component ? <Component {...block} /> : null;
};

export const PostStory = ({ blocks }: PostStoryFragment) => {
  return (
    <article>
      {!!blocks?.length && blocks.map((block, i) => <PostStoryBlock key={i} block={block} />)}
    </article>
  );
};
