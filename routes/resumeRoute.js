import express from "express";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken";
import upload from "../middleware/multerupload";
import {
  uploadResume,
  getResume,
  getResumeByPortfolioId,
  deleteResume,
} from "../controller/resumeController";

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
