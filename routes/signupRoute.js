import express from "express";
import { signup } from "../controller/signupController";
const signupRouter = express.Router();

signupRouter.post("/signup", signup);

export default signupRouter;
