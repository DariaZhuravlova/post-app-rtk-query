//react
import type {FC} from "react";
import {Route, Routes} from "react-router";
//pages
import {HomePage} from "@/pages/home";
import {PostPage} from "@/pages/post/PostPage/PostPage";
import {LoginPage} from "@/pages/login";
import {RegisterPage} from "@/pages/register";
import {ProfilePage} from "@/pages/profile";
//libs
import {
    getHomeRoute,
    getLoginRoute,
    getPostRoute,
    getProfileRoute,
    getRegisterRoute,
} from "@/shared/libs/constants/routes/routes";
import {AuthOnlyGuard} from "./guards/AuthOnlyGuard";

interface AppRouterProps {
    [key: string]: unknown;
}
export const AppRouter: FC<AppRouterProps> = () => {
    return (
        <Routes>
            <Route element={<AuthOnlyGuard />}>
                <Route
                    path={getProfileRoute()}
                    element={<ProfilePage />}
                />
            </Route>
            <Route
                path={getHomeRoute()}
                element={<HomePage />}
            />
            <Route
                path={getPostRoute()}
                element={<PostPage />}
            />
            <Route
                path={getLoginRoute()}
                element={<LoginPage />}
            />
            <Route
                path={getRegisterRoute()}
                element={<RegisterPage />}
            />
        </Routes>
    );
};
