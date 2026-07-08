import express from "express";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken";
import { createAbout } from "../controller/aboutController";

const aboutRouter = express.Router();

aboutRouter.post("/createabout", verifyUseraccesstoken, createAbout);

export default aboutRouter;
