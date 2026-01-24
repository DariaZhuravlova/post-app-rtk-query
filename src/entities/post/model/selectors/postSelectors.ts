import type {StateSchema} from "@/app/config/store/stateSchema";

export const getPosts = (state: StateSchema) => state.posts.posts;
export const getPostsLoading = (state: StateSchema) => state.posts.isLoading;
export const getPostsError = (state: StateSchema) => state.posts.error;

export const getPostsState = (state: StateSchema) => state.posts;
