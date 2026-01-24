import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {PostStateSchema} from "../types/postState";
import type {IPost} from "../types/post";
import {fetchPosts, addPost, updatePost, deletePost} from "../services/postThunks";

const initialState: PostStateSchema = {
    posts: [],
    isLoading: false,
    error: "",
};

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {}, 

    extraReducers: (builder) => {
        builder
            // ---- FETCH POSTS ----
            .addCase(fetchPosts.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<IPost[]>) => {
                state.isLoading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });


    },
});

export const postReducer = postSlice.reducer;

export const postActions = {
    fetchPosts,
    addPost,
    updatePost,
    deletePost,
};
