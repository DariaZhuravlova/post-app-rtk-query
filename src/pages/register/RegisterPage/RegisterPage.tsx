// react
import {type FC, useState} from "react";
import { NavLink, useNavigate } from "react-router";
// constants
import { getLoginRoute } from "@/shared/libs/constants/routes/routes";
// rtk query
import {useRegisterMutation} from "@/features/auth/api/authApi";
// styles
import styles from "./RegisterPage.module.scss";

export const RegisterPage: FC = () => {
    const navigate = useNavigate();

    const [registerUser, {isLoading, error}] = useRegisterMutation();

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        if (!phone || !password) return;

        try {
            await registerUser({phone, password}).unwrap();
            navigate(getLoginRoute());
        } catch (e) {
            console.error("Register error:", e);
        }
    };

    return (
        <div className={styles.RegisterPage}>
            <h1>Register</h1>

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
                onClick={handleRegister}
                disabled={isLoading}
            >
                {isLoading ? "Registering..." : "Register"}
            </button>

            {error && <p className={styles.error}>Registration failed</p>}

            <p className={styles.link}>
                Already have an account? <NavLink to={getLoginRoute()}>Login</NavLink>
            </p>
        </div>
    );
};
