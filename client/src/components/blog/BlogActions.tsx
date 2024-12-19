import { Blog } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import useAuthAxios from "@/hooks/useAuthAxios";
import { toastError } from "@/lib/functions";
import { Link, useLocation, useNavigate } from "react-router-dom";

const BlogActions = ({
  blog,
  refresh,
}: {
  blog: Blog;
  refresh: () => void;
}) => {
  const axios = useAuthAxios();

  const togglePublish = async () => {
    try {
      await axios.put(`blog/${blog.id}`, {
        published: !blog.published,
      });
      refresh();
    } catch (error) {
      toastError(error);
    }
  };

  const handleDelete = async () => {
    const result = confirm("Are you sure?");
    if (result) {
      try {
        await axios.delete(`blog/${blog.id}`);
        refresh();
      } catch (error) {
        toastError(error);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link to={`/edit/${blog.id}`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={togglePublish}>
          {blog.published ? "Unpublish" : "Publish"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default BlogActions;
