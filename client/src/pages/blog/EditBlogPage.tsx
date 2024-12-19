import BlogForm from "@/components/blog/BlogForm";
import useAuthAxios from "@/hooks/useAuthAxios";
import { Blog } from "@/lib/constants";
import { toastError } from "@/lib/functions";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditBlogPage = () => {
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
      <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>
      <BlogForm blog={blog} />
    </div>
  );
};
export default EditBlogPage;
