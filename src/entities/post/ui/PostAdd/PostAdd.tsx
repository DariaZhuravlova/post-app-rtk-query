// react
import {type FC, useState} from "react";
// rtk query
import { useCreatePost } from "../../libs/hooks/useCreatePost";
// styles
import styles from "./PostAdd.module.scss";

export const PostAdd: FC = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [img_url, setImgUrl] = useState("");
    
    const {
        onCreatePost,
        result: { isLoading },
    } = useCreatePost();

    const handleAddPost = () => {
        onCreatePost({
            title,
            text,
            img_url,
            onSuccess: () => {
                setTitle("");
                setText("");
                setImgUrl("");
            },
        });
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
                onClick={handleAddPost}
                type="button"
                disabled={!title || !text || isLoading}
            >
                {isLoading ? "adding..." : "add"}
            </button>
        </div>
    );
};
