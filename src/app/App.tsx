import { AppRouter } from "./config/route/AppRouter";
// styles
import styles from "./App.module.scss";

export const App = () => {
    return (
        <div className={styles.App}>
            <AppRouter />
        </div>
    );
};
