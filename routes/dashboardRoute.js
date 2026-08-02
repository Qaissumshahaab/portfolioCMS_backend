import express from "express";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken.js";
import { getPortfolioAnalytics } from "../controller/dashboardController.js";

const dashboardRouter = express.Router();

// Get portfolio analytics
dashboardRouter.get(
  "/getanalytics",
  verifyUseraccesstoken,
  getPortfolioAnalytics,
);

export default dashboardRouter;
