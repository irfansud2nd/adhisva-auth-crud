import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  getBlogsByAuthor,
  getBlogsByTitle,
  updateBlog,
} from "../controller/blog.js";

const router = express.Router();

router.post("/", verifyJWT, createBlog);
router.get("/", verifyJWT, getBlogs);
router.get("/title/:title", verifyJWT, getBlogsByTitle);

router.put("/:id", verifyJWT, updateBlog);
router.delete("/:id", verifyJWT, deleteBlog);

router.get("/author/:email", verifyJWT, getBlogsByAuthor);
router.get("/:id", verifyJWT, getBlogById);

export default router;
