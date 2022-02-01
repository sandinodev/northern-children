import { useMemo } from "react";
import tw, { styled } from "twin.macro";
import { BaseContainer, BaseButton, BaseWrapper } from "~/components/base";

import { Share } from "~/components/share";

import { PostNewsFragment, PostQuery, PostStoryFragment } from "~/types";

import { PostNews } from "./PostNews";
import { PostStory } from "./PostStory";

interface Props {
  post: PostQuery["post"];
}

const components: { [key: string]: (props: PostNewsFragment | PostStoryFragment) => JSX.Element | null } = {
  news: PostNews,
  story: PostStory,
} as const;

const Category = styled.div`
  ${tw`col-span-full`}

  margin-bottom: 1.5em;
`;

const StyledShare = tw(Share)`lg:mb-100`;

export const Post = ({ post }: Props) => {
  const category = useMemo(() => (post?.type === "news" ? "News" : "Stories"), [post?.type]);

  const Component = post?.type ? components[post.type] : undefined;

  return Component ? (
    <article>
      <Component {...post} />

      <BaseWrapper as="footer" mb>
        <BaseContainer>
          <Category>Category: {category}</Category>

          <StyledShare seo={post?.seo} share={post?.share} />

          <BaseButton href="/news-stories">Back</BaseButton>
        </BaseContainer>
      </BaseWrapper>
    </article>
  ) : null;
};
