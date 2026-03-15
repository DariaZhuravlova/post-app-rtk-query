import {Provider} from "react-redux";
import {createReduxStore} from "../../config/store/createReduxStore";
import type {FC, ReactNode} from "react";

interface StoreProviderProps {
    children: ReactNode;
}

const store = createReduxStore();

export const StoreProvider: FC<StoreProviderProps> = ({children}) => {
    return <Provider store={store}>{children}</Provider>;
};
