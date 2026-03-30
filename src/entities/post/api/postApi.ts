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
// queryKeys
import {postQueryKeys} from "@/entities/post/model/queryKeys";

const postAPI = api.injectEndpoints({
    endpoints: (builder) => ({
        // GET ALL
        getPosts: builder.query<GetPostsResponse, GetPostsRequest>({
            query: () => ({
                url: "posts",
                method: "GET",
            }),
            providesTags: () => postQueryKeys.lists(),
        }),

        // GET ONE
        getPostById: builder.query<GetPostByIdResponse, GetPostByIdRequest>({
            query: (id) => ({
                url: `post/${id}`,
                method: "GET",
            }),
            providesTags: (_result, _error, id) => postQueryKeys.item(id),
        }),

        // CREATE
        createPost: builder.mutation<PostPostResponse, PostPostRequest>({
            query: (newPost) => ({
                url: "post",
                method: "POST",
                body: newPost,
            }),
            invalidatesTags: () => postQueryKeys.lists(),
        }),

        // UPDATE
        updatePost: builder.mutation<PutPostResponse, PutPostRequest>({
            query: (updatedPost) => ({
                url: "post",
                method: "PUT",
                body: updatedPost,
            }),
            invalidatesTags: (_result, _error, arg) => [
                ...postQueryKeys.item(arg._id),
                ...postQueryKeys.lists(),
            ],
        }),

        // DELETE
        deletePost: builder.mutation<DeletePostResponse, DeletePostRequest>({
            query: (id) => ({
                url: `post/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, id) => [
                ...postQueryKeys.item(id),
                ...postQueryKeys.lists(),
            ],
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
