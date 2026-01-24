import {createAsyncThunk} from "@reduxjs/toolkit";
import {postService} from "./postService";
import type {IPost} from "../types/post";

// 1) Получить все посты
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, thunkAPI) => {
    try {
        const {data} = await postService.getPosts();
        return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return thunkAPI.rejectWithValue("Ошибка загрузки постов");
    }
});

// 2) Добавить пост
export const addPost = createAsyncThunk("posts/addPost", async (post: IPost, thunkAPI) => {
    try {
        const {data} = await postService.addPost(post);
        // после добавления — обновляем список
        thunkAPI.dispatch(fetchPosts());
        return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return thunkAPI.rejectWithValue("Ошибка создания поста");
    }
});

// 3) Обновить пост
export const updatePost = createAsyncThunk("posts/updatePost", async (post: IPost, thunkAPI) => {
    try {
        const {data} = await postService.updatePost(post);
        thunkAPI.dispatch(fetchPosts());
        return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return thunkAPI.rejectWithValue("Ошибка обновления поста");
    }
});

// 4) Удалить пост
export const deletePost = createAsyncThunk("posts/deletePost", async (id: string, thunkAPI) => {
    try {
        await postService.deletePost(id);
        thunkAPI.dispatch(fetchPosts());
        return id;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return thunkAPI.rejectWithValue("Ошибка удаления поста");
    }
});
