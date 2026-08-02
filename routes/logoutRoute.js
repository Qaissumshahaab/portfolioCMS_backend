import express from "express";
import { logoutUser } from "../controller/logoutController.js";

const logoutRouter = express.Router();

logoutRouter.get("/logout", logoutUser);

export default logoutRouter;
