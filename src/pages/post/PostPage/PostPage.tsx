// react
import type {FC} from "react";
import {useNavigate, useParams} from "react-router";

// rtk query
import {useGetPostByIdQuery} from "@/entities/post/api/postApi";

// components
import {PostItem} from "@/entities/post/ui/PostItem";
// styles
import styles from "./PostPage.module.scss";

export const PostPage: FC = () => {
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();

    const {data: post} = useGetPostByIdQuery(id!, {skip: !id});

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
              
            />
        </div>
    );
};
