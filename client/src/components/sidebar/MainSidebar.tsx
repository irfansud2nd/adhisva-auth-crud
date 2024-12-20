import { useAuth } from "@/context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import UserSideBar from "./UserSidebar";

type Props = { className?: string; mobile?: boolean };

const MainSidebar = ({ className, mobile }: Props) => {
  const email = useAuth().user?.email as string;
  const pathname = useLocation().pathname;
  const links = [
    {
      href: "/",
      label: "Explore",
    },
    {
      href: `/author/${email}`,
      label: "My Blogs",
    },
    {
      href: `/author/${email}/unpublished`,
      label: "Unpublished Blogs",
    },
    {
      href: `/author/${email}/published`,
      label: "Published Blogs",
    },
    {
      href: `/create`,
      label: "New Blog",
    },
  ];
  return (
    <div className={`rounded bg-slate-200 ${className}`}>
      <div className="p-2 h-fit sticky top-0">
        {mobile && <UserSideBar profileOnly />}

        <div className="flex flex-col gap-y-4">
          {links.map((link) => (
            <Link
              to={link.href}
              key={link.label}
              className={`p-2 rounded font-medium hover:active_link 
              ${link.href == pathname && "active_link"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MainSidebar;
