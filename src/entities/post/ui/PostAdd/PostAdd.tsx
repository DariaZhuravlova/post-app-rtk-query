// react
import {type FC, useState} from "react";
// rtk query
import {useCreatePostMutation} from "@/entities/post/api/postApi";
// styles
import styles from "./PostAdd.module.scss";

export const PostAdd: FC = () => {
    const [createPost, {isLoading}] = useCreatePostMutation();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [img_url, setImgUrl] = useState("");

    const onCreatePost = async () => {
        if (!title || !text) return;

        try {
            await createPost({
                title,
                text,
                img_url: img_url || null, 
            }).unwrap(); 

            setTitle("");
            setText("");
            setImgUrl("");
        } catch (error) {
            console.error("Create post error:", error);
        }
    };

    return (
        <div className={styles.PostAdd}>
            <input
                value={title}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <input
                value={text}
                type="text"
                onChange={(e) => setText(e.target.value)}
                placeholder="Text"
            />
            <input
                value={img_url}
                type="text"
                onChange={(e) => setImgUrl(e.target.value)}
                placeholder="Image URL (optional)"
            />

            <button
                onClick={onCreatePost}
                type="button"
                disabled={!title || !text || isLoading}
            >
                {isLoading ? "adding..." : "add"}
            </button>
        </div>
    );
};
