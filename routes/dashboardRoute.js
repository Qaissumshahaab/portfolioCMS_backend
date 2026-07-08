import express from "express";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken";
const dashboardRouter = express.Router();

dashboardRouter.post("/dashboard", verifyUseraccesstoken);

export default dashboardRouter;
