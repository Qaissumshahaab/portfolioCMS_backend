import express from "express";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken";
import upload from "../middleware/multerupload";
import {
  createHomepage,
  getHomepage,
  getHomepageByPortfolioId,
  deleteHomepage,
} from "../controller/homepageController";

const homepageRouter = express.Router();

homepageRouter.post(
  "/createhomepage",
  verifyUseraccesstoken,
  upload.single("image"),
  createHomepage,
);
homepageRouter.get("/gethomepage", verifyUseraccesstoken, getHomepage);
homepageRouter.get("/gethomepage/:portfolioid", getHomepageByPortfolioId);
homepageRouter.post("/deletehomepage", verifyUseraccesstoken, deleteHomepage);

export default homepageRouter;
