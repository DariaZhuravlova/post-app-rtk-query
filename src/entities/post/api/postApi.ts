// api
import {api} from "@/shared/api/api";
// types
import type {
    GetPostsRequest,
    GetPostsResponse,
    PostPostRequest,
    PostPostResponse,
    PutPostRequest,
    PutPostResponse,
    DeletePostRequest,
    DeletePostResponse,
    GetPostByIdRequest,
    GetPostByIdResponse,
} from "@/entities/post/model/types/postAPItypes";

const postAPI = api.injectEndpoints({
    endpoints: (builder) => ({
        // GET ALL
        getPosts: builder.query<GetPostsResponse, GetPostsRequest>({
            query: () => ({
                url: "posts",
                method: "GET",
            }),
            providesTags: ["POST"],
        }),

        // GET ONE
        getPostById: builder.query<GetPostByIdResponse, GetPostByIdRequest>({
            query: (id) => ({
                url: `post/${id}`,
                method: "GET",
          }),
          providesTags: ["POST"],
        }),

        // CREATE
        createPost: builder.mutation<PostPostResponse, PostPostRequest>({
            query: (newPost) => ({
                url: "post",
                method: "POST",
                body: newPost,
          }),
          invalidatesTags: ["POST"],
        }),

        // UPDATE
        updatePost: builder.mutation<PutPostResponse, PutPostRequest>({
            query: (updatedPost) => ({
                url: "post",
                method: "PUT",
                body: updatedPost,
          }),
          invalidatesTags: ["POST"],
        }),

        // DELETE
        deletePost: builder.mutation<DeletePostResponse, DeletePostRequest>({
            query: (id) => ({
                url: `post/${id}`,
                method: "DELETE",
          }),
          invalidatesTags: ["POST"],
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPostByIdQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} = postAPI;
