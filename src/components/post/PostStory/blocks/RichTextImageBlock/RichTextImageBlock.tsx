import tw from "twin.macro";
import { BaseImage } from "~/components/base";

import { PostStoryRichTextImageBlockFragment } from "~/types";

import { RichTextBlock } from "../RichTextBlock";

const Image = tw.div`col-span-full lg:col-span-6 lg:col-start-7`;

export const RichTextImageBlock = ({ image, text }: PostStoryRichTextImageBlockFragment) => {
  if (!text?.length) return null;

  return (
    <RichTextBlock text={text}>
      {!!image?.length && (
        <Image>
          <BaseImage fullW {...image[0]} />
        </Image>
      )}
    </RichTextBlock>
  );
};
