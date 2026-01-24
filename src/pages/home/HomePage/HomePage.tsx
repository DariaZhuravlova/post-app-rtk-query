// react
import type { FC } from "react";
// components
import { PostAdd } from "@/entities/post/ui/PostAdd";
import { PostItemList } from "@/entities/post/ui/PostItemList";
// styles
import styles from "./HomePage.module.scss";

export const HomePage: FC = () => {
    return (
        <div className={styles.HomePage}>
        <h1>create post</h1>
        <PostAdd />
        <h2>posts</h2>
        <PostItemList />
        </div>
    );
};
