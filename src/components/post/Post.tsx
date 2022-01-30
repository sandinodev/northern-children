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

export const Post = ({ post }: Props) => {
  const Component = post?.type ? components[post.type] : undefined;

  return Component ? <Component {...post} /> : null;
};
