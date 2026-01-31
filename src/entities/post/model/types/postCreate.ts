import type {IPost} from "@/entities/post/model/types/post";

export interface IPostCreate extends Omit<IPost, "_id"> {
    onSuccess: () => void;
}
