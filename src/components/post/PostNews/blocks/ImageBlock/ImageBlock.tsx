import { BaseImage } from "~/components/base";

import { PostNewsImageBlockFragment } from "~/types";

export const ImageBlock = ({ image }: PostNewsImageBlockFragment) => {
  if (!image?.length) return null;

  return <BaseImage fullW {...image[0]} />;
};
