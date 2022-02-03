import { GetStaticProps, NextPage } from "next";

import { NewsStories } from "~/components/newsStories";
import { Seo } from "~/components/seo";

import { GLOBALS_QUERY, NEWS_STORIES_QUERY, POSTS_QUERY } from "~/gql";

import { GlobalDataProps, useSetGlobalData } from "~/hooks";

import { DefaultPage } from "~/layouts/DefaultPage";

import { fetchData } from "~/lib/api";

import { GlobalsQuery, NewsStoriesQuery, PostsQuery } from "~/types";

interface Props extends GlobalDataProps {
  amount: number;
  news: NewsStoriesQuery["news"];
  posts: PostsQuery["posts"];
}

const Page: NextPage<Props> = ({ amount, news, posts, ...rest }) => {
  useSetGlobalData(rest);

  return (
    <>
      <Seo seo={news?.seo?.[0]} />

      <DefaultPage mt>{posts?.length && <NewsStories amount={amount} list={posts} loadMore />}</DefaultPage>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params: _, previewData }) => {
  const globals = await fetchData<GlobalsQuery>(GLOBALS_QUERY);
  const { news } = await fetchData<NewsStoriesQuery>(NEWS_STORIES_QUERY);
  const { amount, posts } = await fetchData<PostsQuery>(POSTS_QUERY, undefined, previewData);

  return {
    revalidate: 60,
    props: {
      amount,
      news,
      posts,
      ...globals,
    },
  };
};

export default Page;
