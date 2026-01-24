import type {IPost} from "./post";

export type GetPostsRequest = void;
export type GetPostsResponse = IPost[];

export type GetPostByIdRequest = IPost["_id"];
export type GetPostByIdResponse = IPost;

export type PostPostRequest = Omit<IPost, "_id">;
export type PostPostResponse = IPost;

export type PutPostRequest = IPost;
export type PutPostResponse = IPost;

export type DeletePostRequest = IPost["_id"];
export type DeletePostResponse = void;


