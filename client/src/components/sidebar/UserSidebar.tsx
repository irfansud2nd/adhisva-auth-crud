import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback } from "../ui/avatar";
import HorizontalBlogCard from "../blog/HorizontalBlogCard";
import useAuthAxios from "@/hooks/useAuthAxios";
import { useEffect, useState } from "react";
import { Blog } from "@/lib/constants";
import { toastError } from "@/lib/functions";
import LogoutButton from "./LogoutButton";

type Props = {
  className?: string;
};

const UserSideBar = ({ className }: Props) => {
  const [unpublishedBlogs, setUnpublishedBlogs] = useState<Blog[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const user = useAuth().user as { name: string; email: string };

  const axios = useAuthAxios();

  const getUnpublishedBlogs = async () => {
    try {
      const response = await axios.get(
        `blog/author/${user.email}?published=false&take=2`
      );
      setUnpublishedBlogs(response.data.result);
    } catch (error) {
      toastError(error);
    }
  };
  const getRecentBlogs = async () => {
    try {
      const response = await axios.get(
        `blog/author/${user.email}?published=true&take=2`
      );
      setRecentBlogs(response.data.result);
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    getUnpublishedBlogs();
    getRecentBlogs();
  }, []);

  return (
    <div className={`h-full bg-slate-200 rounded ${className}`}>
      <div className="px-2 py-2 lg:py-6 flex flex-col items-center justify-between gap-y-2 h-fit sticky top-0">
        <div className="flex flex-col items-center">
          <Avatar className="size-16">
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="font-medium text-lg">Welcome, {user.name}!</h2>
          <p className="text-sm mb-2">{user.email}</p>
          <LogoutButton />
        </div>

        <div className="flex flex-col gap-y-2 ">
          <h3 className="text-start font-medium">Unpublished Blog</h3>
          {unpublishedBlogs.map((blog) => (
            <HorizontalBlogCard blog={blog} key={blog.id} />
          ))}
        </div>

        <div className="flex flex-col gap-y-2">
          <h3 className="text-start font-medium">Recent Blog</h3>
          {recentBlogs.map((blog) => (
            <HorizontalBlogCard blog={blog} key={blog.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default UserSideBar;
