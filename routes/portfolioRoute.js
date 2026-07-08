import express from "express";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken";
import { createPortfolio } from "../controller/portfolioController";
const portfolioRouter = express.Router();

portfolioRouter.post(
  "/createportfolio",
  verifyUseraccesstoken,
  createPortfolio,
);

export default portfolioRouter;
