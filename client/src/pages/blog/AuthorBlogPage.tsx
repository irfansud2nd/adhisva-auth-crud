import Pagination from "@/components/Pagination";
import BlogCard from "@/components/blog/BlogCard";
import { useAuth } from "@/context/AuthContext";
import useAuthAxios from "@/hooks/useAuthAxios";
import usePage from "@/hooks/usePage";
import { Blog } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Props = {
  published?: boolean;
};

const AuthorBlogPage = ({ published }: Props) => {
  const { email } = useParams();
  const { user } = useAuth();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [refresh, setRefresh] = useState(0);
  const axios = useAuthAxios();
  const page = usePage();

  const itemShowing = 6;

  useEffect(() => {
    const getBlogs = async () => {
      try {
        let url = `/blog/author/${email}?take=${itemShowing}&skip=${
          (page - 1) * itemShowing
        }`;

        if (published !== undefined)
          url += `&published=${published ? "true" : "false"}`;

        const response = await axios.get(url);
        setBlogs(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    getBlogs();
  }, [page, email, published, refresh]);

  let title = email + "'s Blogs";

  if (user?.email == email) title = "My Blogs";
  if (published == true) title = "Published Blogs";
  if (published == false) title = "Unpublished Blogs";

  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="flex flex-wrap justify-around gap-2 flex-grow">
        {blogs.length ? (
          blogs.map((blog) => (
            <BlogCard
              blog={blog}
              key={blog.id}
              refresh={
                blog.authorEmail == email
                  ? () => setRefresh((prev) => (prev += 1))
                  : undefined
              }
            />
          ))
        ) : (
          <p>No blog found.</p>
        )}
      </div>
      <Pagination disableNext={blogs.length < itemShowing} />
    </div>
  );
};
export default AuthorBlogPage;
