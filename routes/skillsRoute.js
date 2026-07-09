import express from "express";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken";
import {
  addSkills,
  getSkills,
  getSkillsByPortfolioId,
  deleteSkills,
} from "../controller/skillController";

const skillsRouter = express.Router();

skillsRouter.post("/addskills", verifyUseraccesstoken, addSkills);
skillsRouter.get("/getskills", verifyUseraccesstoken, getSkills);
skillsRouter.get("/getskills/:portfolioid", getSkillsByPortfolioId);
skillsRouter.post("/deleteskills", verifyUseraccesstoken, deleteSkills);

export default skillsRouter;
