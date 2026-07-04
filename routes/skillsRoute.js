import express from "express";
import loginauth from "../middleware/loginauth";
import { addSkills } from "../controller/skillController";
const skillsRouter = express.Router();

skillsRouter.post("/addskills", loginauth, addSkills);

export default skillsRouter;
