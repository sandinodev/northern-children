import tw from "twin.macro";

import { BaseContainer, BaseImage, BaseWrapper } from "~/components/base";

import { FactsStatsImageBlockFragment } from "~/types";

const StyledBaseImage = tw(BaseImage)`col-span-full lg:col-span-6`;

export const ImageBlock = ({ image }: FactsStatsImageBlockFragment) => {
  if (!image?.length) return null;

  return (
    <BaseWrapper>
      <BaseContainer>
        <StyledBaseImage fullW {...image[0]} />
      </BaseContainer>
    </BaseWrapper>
  );
};
