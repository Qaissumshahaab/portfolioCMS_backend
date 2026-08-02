import express from "express";
import { signupUser } from "../controller/signupController.js";
const signupRouter = express.Router();

signupRouter.post("/signup", signupUser);

export default signupRouter;
