import type { IPost } from "./post";

export type PostStateSchema = {
  posts: IPost[];
  isLoading: boolean;
  error: string;
}