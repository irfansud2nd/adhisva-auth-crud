import { PrismaClient } from "@prisma/client";
import { createTitleSlug, getSkipTakeNum } from "../lib/functions.js";

const prisma = new PrismaClient();

export const getBlogs = async (req, res) => {
  const { skip, take } = req.query;
  const { skipNum, takeNum } = getSkipTakeNum(skip, take);

  try {
    const blogs = await prisma.blog.findMany({
      skip: skipNum,
      take: takeNum,
      where: {
        published: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ result: blogs });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getBlogsByTitle = async (req, res) => {
  const { title } = req.params;
  const { skip, take } = req.query;
  const { skipNum, takeNum } = getSkipTakeNum(skip, take);

  try {
    if (!title.length) {
      return res.status(400).json({ message: "Title is required" });
    }

    const blogs = await prisma.blog.findMany({
      skip: skipNum,
      take: takeNum,
      where: {
        title: {
          contains: title,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ result: blogs });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getBlogById = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  try {
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const blog = await prisma.blog.findUnique({ where: { id: Number(id) } });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (!blog.published && blog.authorEmail != user.email) {
      return res
        .status(403)
        .json({ message: "You are not allowed to see this blog" });
    }

    res.status(200).json({ result: blog });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getBlogsByAuthor = async (req, res) => {
  const { skip, take, published } = req.query;
  const { email } = req.params;
  const { user } = req;

  const { skipNum, takeNum } = getSkipTakeNum(skip, take);

  try {
    if (!email)
      return res.status(400).json({ message: "Email identifier is required" });
    const isOwner = user.email == email;

    const blogs = await prisma.blog.findMany({
      skip: skipNum,
      take: takeNum,
      where: {
        author: {
          email,
        },
        ...(published ? { published: published == "true" } : {}),
        ...(isOwner ? {} : { published: true }),
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ result: blogs });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createBlog = async (req, res) => {
  const { title, content, published } = req.body;
  const { user } = req;

  try {
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and Content are required" });
    }

    const newBlog = await prisma.blog.create({
      data: {
        title,
        content,
        published,
        slug: createTitleSlug(title),
        authorEmail: user.email,
      },
    });
    res.status(200).json({ result: newBlog });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateBlog = async (req, res) => {
  const { title, content, published } = req.body;
  const id = Number(req.params.id);
  const { user } = req;

  try {
    if (!title && !content && published == undefined) {
      return res.status(400).json({ message: "Data is required" });
    }

    const blog = await prisma.blog.findUnique({
      where: { id: Number(id) },
    });
    if (!blog || blog.authorEmail !== user.email) {
      return res
        .status(403)
        .json({ message: "You are not allowed to update this blog" });
    }

    const newTitle = title ?? blog.title;

    const updatedBlog = await prisma.blog.update({
      data: {
        title: newTitle,
        content: content ?? blog.content,
        slug: createTitleSlug(newTitle),
        published: published == undefined ? blog.published : published,
        authorEmail: user.email,
      },
      where: {
        id,
      },
    });
    res.status(200).json({ result: updatedBlog });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteBlog = async (req, res) => {
  const id = Number(req.params.id);
  const { user } = req;

  try {
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const blog = await prisma.blog.findUnique({
      where: { id },
    });
    if (blog?.authorEmail !== user.email) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this blog" });
    }

    if (blog) {
      await prisma.blog.delete({ where: { id } });
    }

    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
