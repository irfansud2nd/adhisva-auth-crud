import { Blog } from "@/lib/constants";
import { formatDate } from "@/lib/functions";
import { Link } from "react-router-dom";

const HorizontalBlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <Link
      to={`blog/${blog.id}`}
      className="flex items-center border rounded p-2 gap-x-2 border-slate-400 hover:bg-slate-100 transition"
    >
      <div className="bg-gray-400 size-12 rounded flex justify-center items-center">
        {blog.id}
      </div>
      <div className="flex flex-col justify-between">
        <h5 className="font-medium">{blog.title}</h5>
        <p className="text-gray-700 text-sm">{formatDate(blog.createdAt)}</p>
      </div>
    </Link>
  );
};
export default HorizontalBlogCard;
