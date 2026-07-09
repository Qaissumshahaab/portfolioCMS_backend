import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogsByPortfolioId,
  getBlogById,
  deleteBlog,
  publishBlog,
} from "../controller/blogController";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken";
import upload from "../middleware/multerupload";

const blogRouter = express.Router();

// Create blog
blogRouter.post(
  "/createblog",
  verifyUseraccesstoken,
  upload.single("image"),
  createBlog,
);

// Get all blogs for authenticated user
blogRouter.get("/getblogs", verifyUseraccesstoken, getBlogs);

// Get blogs by portfolio ID (public)
blogRouter.get("/getblogs/:portfolioid", getBlogsByPortfolioId);

// Get single blog by ID (public)
blogRouter.get("/getblog/:blogid", getBlogById);

// Delete blog
blogRouter.post("/deleteblog", verifyUseraccesstoken, deleteBlog);

// Publish/Unpublish blog
blogRouter.post("/publishblog", verifyUseraccesstoken, publishBlog);

export default blogRouter;
