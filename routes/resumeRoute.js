import express from "express";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken.js";
import upload from "../middleware/multerupload.js";
import {
  uploadResume,
  getResume,
  getResumeByPortfolioId,
  deleteResume,
} from "../controller/resumeController.js";

const resumeRouter = express.Router();

resumeRouter.post(
  "/uploadresume",
  verifyUseraccesstoken,
  upload.single("image"),
  uploadResume,
);
resumeRouter.get("/getresume", verifyUseraccesstoken, getResume);
resumeRouter.get("/getresume/:portfolioid", getResumeByPortfolioId);
resumeRouter.post("/deleteresume", verifyUseraccesstoken, deleteResume);

export default resumeRouter;
