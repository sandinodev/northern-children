import { ImageBlock, RichTextBlock, TextWithBackgroundBlock } from "./blocks";

import { Block } from "./types";

interface Props {
  blocks: Block[];
  color?: string;
}

interface BlocksBlockProps {
  block: Block;
  color: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: { [key: string]: (props: any) => JSX.Element | null } = {
  image: ImageBlock,
  richText: RichTextBlock,
  textWithBackground: TextWithBackgroundBlock,
} as const;

const FactsStatsBlocksBlock = ({ block, color }: BlocksBlockProps) => {
  const Component = block?.type ? components[block.type] : undefined;
  const props = block.type === "image" ? {} : { color };

  return Component ? <Component {...block} {...props} /> : null;
};

export const FactsStatsBlocks = ({ blocks, color = "red" }: Props) => {
  return (
    <>
      {blocks.map((block, i) => (
        <FactsStatsBlocksBlock key={i} block={block} color={color} />
      ))}
    </>
  );
};
