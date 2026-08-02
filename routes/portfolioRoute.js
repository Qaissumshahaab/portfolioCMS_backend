import express from "express";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken.js";
import {
  createPortfolio,
  getPortfolio,
  getPortfolioByUserId,
} from "../controller/portfolioController.js";

const portfolioRouter = express.Router();

portfolioRouter.post(
  "/createportfolio",
  verifyUseraccesstoken,
  createPortfolio,
);
portfolioRouter.get("/getportfolio", verifyUseraccesstoken, getPortfolio);
portfolioRouter.get("/getportfolio/:userid", getPortfolioByUserId);

export default portfolioRouter;
