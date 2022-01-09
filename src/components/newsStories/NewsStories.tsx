import tw, { styled } from "twin.macro";
import { BaseButton, BaseCard, BaseContainer, BaseSection } from "~/components/base";

import { NewsCardFragment, StoryCardFragment } from "~/types";

type List = (NewsCardFragment | StoryCardFragment)[];

interface ListProps {
  isFeatured?: boolean;
  list: List;
}

interface Props {
  featured?: List;
  list?: List;
}

const Container = tw(BaseContainer)`col-span-full`;

const More = tw.div`col-span-full flex items-center justify-center mt-100 mb-200`;

const Item = styled.li<{ isFeatured?: boolean }>`
  ${({ isFeatured }) => (isFeatured ? tw`col-span-6` : tw`col-span-3`)}
`;

const NewsStoriesList = ({ isFeatured, list }: ListProps) => {
  return (
    <>
      {list.map(({ image, thumbnail, slug, type, ...rest }) => (
        <Item key={slug} isFeatured={isFeatured}>
          <BaseCard
            href={`/news-stories/${slug}`}
            image={thumbnail?.length ? thumbnail : image}
            large={isFeatured}
            subtitle={type}
            {...rest}
          />
        </Item>
      ))}
    </>
  );
};

export const NewsStories = ({ featured, list }: Props) => {
  return (
    <BaseSection title="News & Stories">
      <Container as="ul" gapY>
        {!!featured?.length && <NewsStoriesList list={featured} isFeatured />}
        {!!list?.length && <NewsStoriesList list={list} />}
      </Container>

      <More>
        <BaseButton ariaLabel="Go to News & Stories page">More</BaseButton>
      </More>
    </BaseSection>
  );
};
