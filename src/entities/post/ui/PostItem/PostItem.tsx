// react
import { type FC, useState } from "react";
import { Link } from "react-router";
// rtk query
import {useDeletePostMutation, useUpdatePostMutation} from "@/entities/post/api/postApi";
// types
import type {IPost} from "@/entities/post/model/types/post";
// styles
import styles from "./PostItem.module.scss";

interface PostItemProps {
    post: IPost;
}

const fallbackImg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZWyg5k6Y2X4OaOfDMPcFaAwL9r_eN34CUXbEgCEjMepep7WMua2z90y_DGL0YobiBjRY&usqp=CAU";

const LIMIT = 30;

export const PostItem: FC<PostItemProps> = ({post}) => {
    const {_id, title, text, img_url} = post;

    const [deletePost, {isLoading: isDeleting}] = useDeletePostMutation();
    const [updatePost, {isLoading: isUpdating}] = useUpdatePostMutation();

    const [isEdit, setIsEdit] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedText, setUpdatedText] = useState(text);
    const [updatedImg, setUpdatedImg] = useState(img_url);

    const truncatedText = text.length > LIMIT ? text.slice(0, LIMIT) + "..." : text;

    const onDelete = async () => {
        if (!_id) return;
        await deletePost(_id).unwrap(); 
    };

    const onSave = async () => {
        if (!_id) return;

        await updatePost({
            _id,
            title: updatedTitle,
            text: updatedText,
            img_url: updatedImg,
        });

        setIsEdit(false);
    };

    return (
        <div className={styles.postItem}>
            {isEdit ? (
                <>
                    <input
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                    <input
                        value={updatedText}
                        onChange={(e) => setUpdatedText(e.target.value)}
                    />
                    <input
                        value={updatedImg ?? ""}
                        onChange={(e) => setUpdatedImg(e.target.value)}
                    />

                    <button
                        onClick={onSave}
                        disabled={isUpdating}
                    >
                        {isUpdating ? "saving..." : "save"}
                    </button>
                </>
            ) : (
                <>
                    <Link
                        to={`/post/${_id}`}
                        className={styles.cardLink}
                    >
                        <h2>{title}</h2>

                        <p className={styles.text}>
                            {expanded ? text : truncatedText}{" "}
                            {text.length > LIMIT && (
                                <span
                                    className={styles.readMore}
                                    onClick={() => setExpanded((prev) => !prev)}
                                >
                                    {expanded ? "Hide" : "Read more"}
                                </span>
                            )}
                        </p>

                        <img
                            src={img_url ?? fallbackImg}
                            alt={title}
                            onError={(e) => {
                                e.currentTarget.src = fallbackImg;
                            }}
                        />
                    </Link>
                    <div className={styles.actions}>
                        <button onClick={() => setIsEdit(true)}>edit</button>
                        <button
                            onClick={onDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "deleting..." : "delete"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
