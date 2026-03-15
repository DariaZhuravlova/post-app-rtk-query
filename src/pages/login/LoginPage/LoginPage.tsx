// react
import { type FC, useState } from "react";
// router
import {NavLink, useNavigate} from "react-router";
import { getRegisterRoute, getProfileRoute } from "@/shared/libs/constants/routes/routes";
// rtk
import {useLoginMutation} from "@/features/auth/api/authApi";
// styles
import styles from "./LoginPage.module.scss";

export const LoginPage: FC = () => {
    const navigate = useNavigate();

    const [loginUser, {isLoading, error}] = useLoginMutation();

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!phone || !password) return;

        try {
            const response = await loginUser({phone, password}).unwrap();

            if (response.ok) {
                navigate(getProfileRoute());
            }
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    return (
        <div className={styles.LoginPage}>
            <h1>Login</h1>

            <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                onClick={handleLogin}
                disabled={isLoading}
            >
                {isLoading ? "Logging in..." : "Login"}
            </button>

            {error && <p className={styles.error}>Incorrect phone or password</p>}

            <p className={styles.link}>
                Don’t have an account? <NavLink to={getRegisterRoute()}>Register</NavLink>
            </p>
        </div>
    );
};
