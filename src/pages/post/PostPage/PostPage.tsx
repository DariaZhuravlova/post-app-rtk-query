// react
import type {FC} from "react";
import {Navigate, useNavigate, useParams} from "react-router";

// rtk query
import {useGetPostByIdQuery, useDeletePostMutation} from "@/entities/post/api/postApi";

// components
import {PostItem} from "@/entities/post/ui/PostItem";
// styles
import styles from "./PostPage.module.scss";

export const PostPage: FC = () => {
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();

    const {data: post, isError} = useGetPostByIdQuery(id!, {skip: !id});

    const [deletePost, {isLoading: isDeleting}] = useDeletePostMutation();

    const handleDelete = async () => {
        if (!id) return;

        await deletePost(id).unwrap();
        navigate("/");
    };

    if (isError) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }
    if (!post) return null;

    return (
        <div className={styles.PostPage}>
            <button
                className={styles.backBtn}
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

            <PostItem
                post={post}
                onDelete={handleDelete}
                isDeleting={isDeleting}
            />
        </div>
    );
};
