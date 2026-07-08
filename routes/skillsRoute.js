import express from "express";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken";
import { addSkills } from "../controller/skillController";
const skillsRouter = express.Router();

skillsRouter.post("/addskills", verifyUseraccesstoken, addSkills);

export default skillsRouter;
