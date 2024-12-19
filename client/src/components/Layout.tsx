import { Outlet } from "react-router-dom";
import { Toaster } from "./ui/sonner";

const Layout = () => {
  return (
    <main>
      <Toaster richColors visibleToasts={1} />
      <Outlet />
    </main>
  );
};
export default Layout;
