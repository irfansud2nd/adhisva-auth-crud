import { Blog } from "@/lib/constants";
import { formatDate } from "@/lib/functions";
import { Link } from "react-router-dom";
import BlogActions from "./BlogActions";

type Props = {
  blog: Blog;
  refresh?: () => void;
};

const BlogCard = ({ blog, refresh }: Props) => {
  const blogLink = `/blog/${blog.id}`;

  return (
    <div className="w-full min-w-60 max-w-72 p-2 border-2 rounded hover:translate-x-1 hover:-translate-y-1 hover:shadow transition bg-white flex flex-col">
      <Link
        to={blogLink}
        className="aspect-video rounded flex justify-center items-center bg-slate-200 text-lg"
      >
        {blog.title}
      </Link>
      <Link to={blogLink} className="font-semibold text-lg hover_blue">
        {blog.title}
      </Link>
      <div className="flex gap-x-1 items-center">
        <p className="text-sm">{formatDate(blog.createdAt)}</p>
        <span>|</span>
        <Link to={`/author/${blog.authorEmail}`} className="text-sm hover_blue">
          {blog.authorEmail}
        </Link>
      </div>

      <p className="text-justify mt-1 flex-grow">
        {blog.content.substring(0, 100)} ...
      </p>
      <div className="flex items-center justify-between">
        <Link to={blogLink} className="text-blue-500">
          Read more
        </Link>

        {refresh && <BlogActions blog={blog} refresh={refresh} />}
      </div>
    </div>
  );
};
export default BlogCard;
