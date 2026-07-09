import express from "express";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken";
import {
  createPortfolio,
  getPortfolio,
  getPortfolioByUserId,
} from "../controller/portfolioController";

const portfolioRouter = express.Router();

portfolioRouter.post(
  "/createportfolio",
  verifyUseraccesstoken,
  createPortfolio,
);
portfolioRouter.get("/getportfolio", verifyUseraccesstoken, getPortfolio);
portfolioRouter.get("/getportfolio/:userid", getPortfolioByUserId);

export default portfolioRouter;
