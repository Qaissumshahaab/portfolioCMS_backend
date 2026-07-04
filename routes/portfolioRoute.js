import express from "express";
import loginauth from "../middleware/loginauth";
import { createPortfolio } from "../controller/portfolioController";
const portfolioRouter = express.Router();

portfolioRouter.post("/createportfolio", loginauth, createPortfolio);

export default portfolioRouter;
