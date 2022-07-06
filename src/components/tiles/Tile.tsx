import tw, { styled } from "twin.macro";

import { BaseWrapper, BaseContainer, BaseImage, BaseText, BaseButton, BaseRichText } from "~/components/base";
import { MaskOpacity } from "~/components/mask";

import { AssetFragment, LinkFragment } from "~/types";

export interface TileProps {
  item?: {
    contactLink?: LinkFragment;
    description?: string;
    image?: AssetFragment[];
    subtitle?: string;
    title?: string;
  };
  richText?: boolean;
}

const Wrapper = tw(BaseWrapper)`pt-80 pb-100`;

const Content = tw.div`col-span-full lg:col-span-6`;

const Title = styled.h2`
  ${tw`mb-40 lg:mb-60 text-xl font-alpina`}
`;

const Subtitle = tw.h3`mb-40 text-md`;

const ImageMobile = tw.div`lg:hidden w-full mb-40`;

const Description = tw.div`mb-60`;

const Image = tw.div`hidden lg:block col-span-5 col-start-8`;

export const Tile = ({ item, richText }: TileProps) => {
  if (!item) return null;

  return (
    <Wrapper as="li">
      <BaseContainer>
        <Content>
          <MaskOpacity>
            <Title>{item.title}</Title>
          </MaskOpacity>

          {!!item.subtitle?.length && (
            <MaskOpacity>
              <Subtitle>{item.subtitle}</Subtitle>
            </MaskOpacity>
          )}

          <ImageMobile>
            <BaseImage {...item.image?.[0]} />
          </ImageMobile>

          <Description>
            {richText ? <BaseRichText text={item.description} /> : <BaseText text={item.description} />}
          </Description>

          {item.contactLink && <BaseButton href={item.contactLink.url}>{item.contactLink.text}</BaseButton>}
        </Content>

        <Image>
          <BaseImage {...item.image?.[0]} />
        </Image>
      </BaseContainer>
    </Wrapper>
  );
};
