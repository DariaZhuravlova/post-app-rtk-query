//types
import type { IPostCreate } from "@/entities/post/model/types/postCreate";
// rtk query
import { useCreatePostMutation } from "@/entities/post/api/postApi";

export const useCreatePost = () => {
  const [createPost, result] = useCreatePostMutation();
    const onCreatePost = async ({
        text,
        title,
        img_url,
        onSuccess,
    }: IPostCreate) => {
        if (!title || !text) return;

        try {
            await createPost({
                title,
                text,
                img_url: img_url || null,
            }).unwrap();

            onSuccess();
        } catch (error) {
            console.error("Create post error:", error);
        }
    };

    return {
        onCreatePost,
        result,
    };
};

