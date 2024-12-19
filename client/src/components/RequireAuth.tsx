import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "./navbar/Navbar";
import UserSideBar from "./sidebar/UserSidebar";
import MainSidebar from "./sidebar/MainSidebar";

const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    <div className="w-full 2xl:container 2xl:mx-auto min h-screen grid grid-cols-[1fr_auto] gap-1">
      <div className="w-full h-full grid grid-rows-[auto_1fr] gap-1">
        <Navbar />
        <div className="w-full h-full grid grid-cols-[auto_1fr] gap-1">
          <MainSidebar className="max-md:hidden" />
          <div className="p-2 rounded bg-slate-100">
            <Outlet />
          </div>
        </div>
      </div>
      <UserSideBar className="max-md:hidden" />
    </div>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};
export default RequireAuth;
