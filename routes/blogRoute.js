import express from "express";
import {
  createBlog,
  updateBlog,
  getBlogs,
  getBlogsByPortfolioId,
  getBlogById,
  deleteBlog,
  publishBlog,
} from "../controller/blogController.js";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken.js";
import upload from "../middleware/multerupload.js";

const blogRouter = express.Router();

// Create blog
blogRouter.post(
  "/createblog",
  verifyUseraccesstoken,
  upload.single("image"),
  createBlog,
);

// Update blog (cover image optional - keeps existing image if none is sent)
blogRouter.post(
  "/updateblog",
  verifyUseraccesstoken,
  upload.single("image"),
  updateBlog,
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
