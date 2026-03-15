import { getLoginRoute } from "@/shared/libs/constants/routes/routes";
import type { RootState } from "@/app/config/store/createReduxStore";
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

export const AuthOnlyGuard = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to={getLoginRoute()} />;
  }
      return <Outlet />
}
