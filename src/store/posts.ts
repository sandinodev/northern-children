import create from "zustand";
import { devtools } from "zustand/middleware";

import { PostsQuery } from "~/types";

export interface PostsStore {
  amount: number;
  setAmount: (amount: number) => void;
  posts: PostsQuery["posts"];
  setPosts: (posts?: PostsQuery["posts"]) => void;
}

export const usePostsStore = create<PostsStore>(
  devtools((set, get) => {
    return {
      amount: 0,
      setAmount: (amount) => set({ amount }),
      posts: undefined,
      setPosts: (posts) => set({ posts }),
    };
  })
);
