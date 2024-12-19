import { Blog } from "@/lib/constants";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toastError } from "@/lib/functions";
import useAuthAxios from "@/hooks/useAuthAxios";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";

type Props = {
  blog?: Blog;
};

const BlogForm = ({ blog }: Props) => {
  const [title, setTitle] = useState(blog?.title ?? "");
  const [content, setContent] = useState(blog?.content ?? "");
  const [published, setPublished] = useState(blog?.published ?? false);

  const axios = useAuthAxios();

  const handleSubmit = async () => {
    try {
      const data = {
        title,
        content,
        published,
      };
      if (blog) {
        // UPDATE
        await axios.put(`blog/${blog.id}`, data);
      } else {
        // CREATE
        await axios.post("blog", data);
      }
      setTitle("");
      setContent("");
      setPublished(false);
      toast.success(`Blog successfully ${blog ? "updated" : "created"}`);
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col gap-y-2"
    >
      <Label>Title</Label>
      <Input
        type="text"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-white"
        placeholder="Insert your title here"
      />
      <Label>Content</Label>
      <Textarea
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="bg-white"
        placeholder="Insert your content here"
      />
      <div className="flex items-center gap-x-1">
        <Checkbox
          checked={published}
          onCheckedChange={() => setPublished((prev) => !prev)}
        />
        <Label>Publish</Label>
        <span className="text-sm text-gray-700">
          (People would be able to see your blog)
        </span>
      </div>
      <Button type="submit" className="w-fit ml-auto">
        Send
      </Button>
    </form>
  );
};
export default BlogForm;
