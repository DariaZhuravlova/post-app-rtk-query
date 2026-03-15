import {type FC} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {getHomeRoute, getLoginRoute} from "@/shared/libs/constants/routes/routes";
import {useGetProfileQuery} from "@/entities/user/api/userApi";
import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {useDispatch} from "react-redux";
import {logout} from "@/features/auth/model/slice/authSlice";
import {api} from "@/shared/api/api";

const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
    return typeof error === "object" && error !== null && "status" in error;
};

export const ProfilePage: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data, isLoading, error} = useGetProfileQuery();
    const status = isFetchBaseQueryError(error) ? error.status : undefined;
    const errorMessage =
        isFetchBaseQueryError(error) &&
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data &&
        typeof error.data.message === "string"
            ? error.data.message
            : null;

    const handleLogout = () => {
        dispatch(logout());
        dispatch(api.util.resetApiState());
        navigate(getLoginRoute(), {replace: true});
    };

    return (
        <div>
            <h1>Profile</h1>
            <button onClick={handleLogout}>Logout</button>

            <p>
                <NavLink to={getHomeRoute()}>Go to home</NavLink>
            </p>

            {isLoading && <p>Loading...</p>}

            {error && (
                <div>
                    <p>
                        {status === 401 || status === 403
                            ? "Session expired. Please login again."
                            : errorMessage ?? "Failed to load profile."}
                    </p>
                    {status && typeof status === "number" && <p>Status: {status}</p>}
                    <NavLink to={getLoginRoute()}>Go to login</NavLink>
                </div>
            )}

            {data && (
                <div>
                    <p>
                        <strong>ID:</strong> {data.user._id}
                    </p>
                    <p>
                        <strong>Phone:</strong> {data.user.phone}
                    </p>
                    <p>
                        <strong>Role:</strong> {data.user.role}
                    </p>
                </div>
            )}
        </div>
    );
};
