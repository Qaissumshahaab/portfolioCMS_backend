import express from "express";
import { validaterefreshToken } from "../controller/refreshTokenController";

const refreshTokenRouter = express.Router();

refreshTokenRouter.get("/refresh-token", validaterefreshToken);

export default refreshTokenRouter;
