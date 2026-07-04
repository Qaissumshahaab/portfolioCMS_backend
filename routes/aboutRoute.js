import express from "express";
import loginauth from "../middleware/loginauth";
import { createAbout } from "../controller/aboutController";

const aboutRouter = express.Router();

aboutRouter.post("/createabout", loginauth, createAbout);

export default aboutRouter;
