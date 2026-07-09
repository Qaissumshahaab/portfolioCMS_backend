import express from "express";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken";
import {
  createSocialLinks,
  getSocialLinks,
  getSocialLinksByPortfolioId,
  deleteSocialLinks,
} from "../controller/sociallinksController";

const sociallinksRouter = express.Router();

sociallinksRouter.post(
  "/createsociallinks",
  verifyUseraccesstoken,
  createSocialLinks,
);
sociallinksRouter.get("/getsociallinks", verifyUseraccesstoken, getSocialLinks);
sociallinksRouter.get(
  "/getsociallinks/:portfolioid",
  getSocialLinksByPortfolioId,
);
sociallinksRouter.post(
  "/deletesociallinks",
  verifyUseraccesstoken,
  deleteSocialLinks,
);

export default sociallinksRouter;
