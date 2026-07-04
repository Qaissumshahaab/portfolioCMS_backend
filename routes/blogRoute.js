import express from "express";
import { createBlog } from "../controller/blogController";
import loginauth from "../middleware/loginauth";
import upload from "../middleware/multerupload";

const blogRouter = express.Router();

blogRouter.post("/createblog", loginauth, upload.single("image"), createBlog);

export default blogRouter;
