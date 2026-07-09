import express from "express";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken";
import {
  createAbout,
  getAbout,
  getAboutByPortfolioId,
  deleteAbout,
} from "../controller/aboutController";

const aboutRouter = express.Router();

// Create/Update about section
aboutRouter.post("/createabout", verifyUseraccesstoken, createAbout);

// Get about section for authenticated user
aboutRouter.get("/getabout", verifyUseraccesstoken, getAbout);

// Get about section by portfolio ID (public)
aboutRouter.get("/getabout/:portfolioid", getAboutByPortfolioId);

// Delete about section
aboutRouter.post("/deleteabout", verifyUseraccesstoken, deleteAbout);

export default aboutRouter;
