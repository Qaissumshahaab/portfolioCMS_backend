import express from "express";
import loginauth from "../middleware/loginauth";
const dashboardRouter = express.Router();

dashboardRouter.post("/dashboard", loginauth);

export default dashboardRouter;
