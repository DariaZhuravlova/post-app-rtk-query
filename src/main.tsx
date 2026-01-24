import {createRoot} from "react-dom/client";
import {App} from "./app/App.tsx";
import {BrowserRouter} from "react-router";
import {StoreProvider} from "@/app/providers/store/StoreProvider.tsx";
// styles
import "./index.scss";

createRoot(document.getElementById("root")!).render(
    <StoreProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StoreProvider>
);
