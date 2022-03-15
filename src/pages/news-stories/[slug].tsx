import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Post } from "~/components/post";

import { Seo } from "~/components/seo";

import { GLOBALS_QUERY, POSTS_SLUGS_QUERY, POST_QUERY } from "~/gql";

import { GlobalDataProps, useSetGlobalData } from "~/hooks";

import { DefaultPage } from "~/layouts/DefaultPage";

import { fetchData } from "~/lib/api";

import { GlobalsQuery, PostQuery, PostsSlugsQuery } from "~/types";

interface Props extends GlobalDataProps {
  post: PostQuery["post"];
}

const Page: NextPage<Props> = ({ post, seoDefault, ...rest }) => {
  useSetGlobalData(rest);

  return (
    <>
      <Seo seo={post?.seo?.[0]} seoDefault={seoDefault} />

      <DefaultPage>{post && <Post post={post} />}</DefaultPage>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } = {}, previewData }) => {
  let _slug: string;

  if (typeof slug === "string") {
    _slug = slug;
  } else {
    _slug = (slug || []).join("/");
  }

  const globals = await fetchData<GlobalsQuery>(GLOBALS_QUERY);
  const { post } = await fetchData<PostQuery>(POST_QUERY, { slug: _slug }, previewData);

  return {
    revalidate: 60,
    props: {
      post,
      ...globals,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts = [] } = await fetchData<PostsSlugsQuery>(POSTS_SLUGS_QUERY);

  const paths = posts.filter((post) => !!post?.slug).map(({ slug }) => `/news-stories/${slug}`) || [];

  return {
    paths,
    fallback: true,
  };
};

export default Page;
