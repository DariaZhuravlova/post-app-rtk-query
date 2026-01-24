// react
import {type FC} from "react";
// rtk query
import {useGetPostsQuery} from "@/entities/post/api/postApi";
// components
import {PostItem} from "../PostItem/PostItem";
// styles
import styles from "./PostItemList.module.scss";

export const PostItemList: FC = () => {
    const {data: posts = [], isLoading, isError, error} = useGetPostsQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {String(error)}</div>;
    }

    return (
        <div className={styles.PostItemList}>
            {posts.map((post) => (
                <PostItem
                    key={post._id}
                    post={post}
                />
            ))}
        </div>
    );
};
