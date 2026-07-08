import express from "express";
import { createBlog } from "../controller/blogController";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken";
import upload from "../middleware/multerupload";

const blogRouter = express.Router();

blogRouter.post(
  "/createblog",
  verifyUseraccesstoken,
  upload.single("image"),
  createBlog,
);

export default blogRouter;
