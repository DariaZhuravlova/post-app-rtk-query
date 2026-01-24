import {api} from "@/shared/api/api";
import type {IPost} from "@/entities/post/model/types/post";

class PostService {
    // GET ALL
    async getPosts() {
        return api.get<IPost[]>("/posts");
    }

    // CREATE
    async addPost(post: IPost) {
        return api.post("/post", post);
    }

    // UPDATE (id В BODY!)
    async updatePost(post: IPost) {
        return api.put("/post", post);
    }

    // DELETE
    async deletePost(id: string) {
        return api.delete(`/post/${id}`);
    }

    // GET ONE 
    async getPostById(id: string) {
        return api.get<IPost>(`/post/${id}`);
    }
}

export const postService = new PostService();
