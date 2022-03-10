import { useMemo, useState } from "react";
import tw, { styled } from "twin.macro";

import { BaseButton, BaseCard, BaseContainer, BaseSection } from "~/components/base";
import { MaskOpacity } from "~/components/mask";
import { PostsStore, usePostsStore } from "~/store/posts";

import { NewsCardFragment, StoryCardFragment } from "~/types";

type List = (NewsCardFragment | StoryCardFragment)[];

interface ListProps {
  isFeatured?: boolean;
  list: List;
}

interface Props {
  featured?: List;
  list?: List;
  loadMore?: boolean;
}

const Container = tw(BaseContainer)`col-span-full`;

const More = styled.div<{ isHidden: boolean }>`
  ${tw`col-span-full flex items-center justify-center mt-80 lg:mt-100`}

  transition: opacity 0.25s, display 0s 0.25s;

  ${({ isHidden }) => isHidden && tw`hidden opacity-0`}
`;

const Loading = styled.div<{ isVisible: boolean }>`
  ${tw`absolute flex items-center justify-center top-0 left-0 w-full h-full bg-yellow rounded-full opacity-0`}

  transition: opacity 0.25s;

  ${({ isVisible }) => isVisible && tw`opacity-100`}
`;

const Item = styled.li<{ isFeatured?: boolean }>`
  ${({ isFeatured }) => (isFeatured ? tw`col-span-full lg:col-span-6` : tw`col-span-full lg:col-span-3`)}
`;

const NewsStoriesList = ({ isFeatured, list }: ListProps) => {
  return (
    <>
      {/* @ts-expect-error */}
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

const postsStoreSelector = ({ amount, posts, setPosts }: PostsStore) => ({ amount, posts, setPosts });

export const NewsStories = ({ featured, list = [], loadMore }: Props) => {
  const { amount, posts, setPosts } = usePostsStore(postsStoreSelector);

  const [isFetching, setIsFetching] = useState(false);
  const postsList = useMemo(() => (loadMore ? posts : list) || [], [list, loadMore, posts]);

  const canFetchMore = useMemo(() => !!amount && amount > postsList.length, [amount, postsList.length]);
  const isMoreHidden = useMemo(() => !!loadMore && !canFetchMore, [canFetchMore, loadMore]);

  const fetchMorePosts = async () => {
    if (!canFetchMore || isFetching) return;

    setIsFetching(true);
    try {
      const res = await fetch(`/api/fetch-more-posts?offset=${postsList.length}`);
      const { posts: newPosts } = await res.json();

      if (!res.ok) {
        throw new Error();
      }

      if (newPosts?.length) {
        setPosts([...postsList, ...newPosts]);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    } finally {
      setIsFetching(false);
    }
  };

  const buttonProps = useMemo(
    () =>
      loadMore ? { ariaLabel: "Load more posts" } : { ariaLabel: "Go to News & Stories page", href: "/news-stories" },
    [loadMore]
  );

  return (
    <BaseSection noMt={loadMore} title="News & Stories" mb>
      <Container as="ul" gapY>
        {!!featured?.length && <NewsStoriesList list={featured} isFeatured />}
        {!!postsList?.length && <NewsStoriesList list={postsList} />}
      </Container>

      <More isHidden={isMoreHidden}>
        <MaskOpacity noY>
          <BaseButton
            disabled={isFetching || isMoreHidden}
            onClick={loadMore ? fetchMorePosts : undefined}
            {...buttonProps}
          >
            More
            {loadMore && <Loading isVisible={isFetching}>Loading</Loading>}
          </BaseButton>
        </MaskOpacity>
      </More>
    </BaseSection>
  );
};
