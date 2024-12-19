import Pagination from "@/components/Pagination";
import BlogCard from "@/components/blog/BlogCard";
import useAuthAxios from "@/hooks/useAuthAxios";
import usePage from "@/hooks/usePage";
import { Blog } from "@/lib/constants";
import { useState, useEffect } from "react";

const AllBlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const axios = useAuthAxios();
  const page = usePage();

  const itemShowing = 6;

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get(
          `/blog?take=${itemShowing}&skip=${(page - 1) * itemShowing}`
        );
        setBlogs(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    getBlogs();
  }, [page]);

  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Recent Blogs</h1>
      <div className="flex flex-wrap justify-around gap-2 flex-grow">
        {blogs.length ? (
          blogs.map((blog) => <BlogCard blog={blog} key={blog.id} />)
        ) : (
          <p>No blog found.</p>
        )}
      </div>
      <Pagination disableNext={blogs.length < itemShowing} />
    </div>
  );
};
export default AllBlogPage;
