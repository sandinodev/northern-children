import { ImageBlock, RichTextBlock, TextWithBackgroundBlock } from "./blocks";

import { Block } from "./types";

interface Props {
  blocks: Block[];
}

interface BlocksBlockProps {
  block: Block;
}

const components: { [key: string]: (props: Block) => JSX.Element | null } = {
  image: ImageBlock,
  richText: RichTextBlock,
  textWithBackground: TextWithBackgroundBlock,
} as const;

const FactsStatsBlocksBlock = ({ block }: BlocksBlockProps) => {
  const Component = block?.type ? components[block.type] : undefined;

  return Component ? <Component {...block} /> : null;
};

export const FactsStatsBlocks = ({ blocks }: Props) => {
  return (
    <>
      {blocks.map((block, i) => (
        <FactsStatsBlocksBlock key={i} block={block} />
      ))}
    </>
  );
};
