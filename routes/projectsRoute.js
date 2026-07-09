import express from "express";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken";
import {
  createProject,
  getProjects,
  getProjectsByPortfolioId,
  deleteProject,
} from "../controller/projectsController";

const projectsRouter = express.Router();

projectsRouter.post("/createproject", verifyUseraccesstoken, createProject);
projectsRouter.get("/getprojects", verifyUseraccesstoken, getProjects);
projectsRouter.get("/getprojects/:portfolioid", getProjectsByPortfolioId);
projectsRouter.post("/deleteproject", verifyUseraccesstoken, deleteProject);

export default projectsRouter;
