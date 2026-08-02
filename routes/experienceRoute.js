import express from "express";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken.js";
import {
  createExperience,
  getExperience,
  getExperienceByPortfolioId,
  deleteExperience,
} from "../controller/experienceController.js";

const experienceRouter = express.Router();

experienceRouter.post(
  "/createexperience",
  verifyUseraccesstoken,
  createExperience,
);
experienceRouter.get("/getexperience", verifyUseraccesstoken, getExperience);
experienceRouter.get("/getexperience/:portfolioid", getExperienceByPortfolioId);
experienceRouter.post(
  "/deleteexperience",
  verifyUseraccesstoken,
  deleteExperience,
);

export default experienceRouter;
