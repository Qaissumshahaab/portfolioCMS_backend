import express from "express";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken";
import { getPortfolioAnalytics } from "../controller/dashboardController";

const dashboardRouter = express.Router();

// Get portfolio analytics
dashboardRouter.get(
  "/getanalytics",
  verifyUseraccesstoken,
  getPortfolioAnalytics,
);

export default dashboardRouter;
