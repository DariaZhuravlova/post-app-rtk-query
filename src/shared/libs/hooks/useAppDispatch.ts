// redux
import {useDispatch} from "react-redux";
// types
import type {AppDispatch} from "@/app/config/store/createReduxStore";

export const useAppDispatch = () => {
    return useDispatch<AppDispatch>();
};
