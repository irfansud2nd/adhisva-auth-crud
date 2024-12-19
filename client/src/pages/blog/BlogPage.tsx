import useAuthAxios from "@/hooks/useAuthAxios";
import { Blog } from "@/lib/constants";
import { formatDate, toastError } from "@/lib/functions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  const [blog, setBlog] = useState<Blog>();
  const [errMsg, setErrMsg] = useState("");
  const { id } = useParams();
  const axios = useAuthAxios();

  const getBlog = async () => {
    try {
      const response = await axios.get(`blog/${id}`);

      setBlog(response.data.result);
    } catch (error) {
      const msg = toastError(error);
      setErrMsg(msg);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  if (errMsg) return <p className="text-destructive">{errMsg}</p>;

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{blog.title}</h1>
      <p>
        {formatDate(blog.createdAt)} | {blog.authorEmail}
      </p>

      <div className="aspect-video max-h-80 mx-auto my-4 rounded flex justify-center items-center bg-slate-200">
        {blog.title}
      </div>

      <p>{blog.content}</p>
    </div>
  );
};
export default BlogPage;
