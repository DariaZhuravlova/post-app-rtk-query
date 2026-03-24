// react
import type {FC} from "react";
import type {RootState} from "@/app/config/store/createReduxStore";
import {NavLink} from "react-router";
import {useDispatch, useSelector} from "react-redux";
// components
import {PostAdd} from "@/entities/post/ui/PostAdd";
import { PostItemList } from "@/entities/post/ui/PostItemList";
// const
import { getLoginRoute, getProfileRoute, getRegisterRoute } from "@/shared/libs/constants/routes/routes";
import { api } from "@/shared/api/api";
import { tokenService } from "@/shared/libs/storage/token";
import {authActions} from "@/features/auth/model/slice/authSlice";
// styles
import styles from "./HomePage.module.scss";


export const HomePage: FC = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const handleLogout = () => {
        tokenService.remove();
        dispatch(authActions.logout());
        dispatch(api.util.resetApiState());
    };

    return (
        <div className={styles.HomePage}>
            <div className={styles.authLinks}>
                {isLoggedIn ? (
                    <>
                        <NavLink
                            to={getProfileRoute()}
                            className={styles.authLink}
                        >
                            Profile
                        </NavLink>
                        <button
                            type="button"
                            className={styles.authLink}
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink
                            to={getLoginRoute()}
                            className={styles.authLink}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to={getRegisterRoute()}
                            className={styles.authLink}
                        >
                            Register
                        </NavLink>
                    </>
                )}
            </div>
            <h1>create post</h1>
            <PostAdd />
            <h2>posts</h2>
            <PostItemList />
        </div>
    );
};
