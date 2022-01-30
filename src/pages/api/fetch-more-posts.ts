import { NextApiHandler } from "next";

import { POSTS_QUERY } from "~/gql";

import { fetchData } from "~/lib/api";

import { PostsQuery } from "~/types";

const _: NextApiHandler = async ({ query }, res) => {
  try {
    const { posts } = await fetchData<PostsQuery>(POSTS_QUERY, { offset: Number(query.offset) });

    res.send({ posts });
    res.status(200);
  } catch (e) {
    // @ts-expect-error
    res.statusMessage = e;
    // @ts-expect-error
    res.status(e?.response?.status || 500);
  } finally {
    res.end();
  }
};

// eslint-disable-next-line import/no-default-export
export default _;
