import express from "express";
import { loginUser } from "../controller/loginController.js";
const loginRouter = express.Router();

loginRouter.post("/login", loginUser);

export default loginRouter;
