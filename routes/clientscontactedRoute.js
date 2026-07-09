import express from "express";
import { sendemailfromForm } from "../controller/clientscontactedController";

const clientscontactedRouter = express.Router();

// Public route - allows external visitors to send contact form without authentication
clientscontactedRouter.post("/sendcontactform", sendemailfromForm);

export default clientscontactedRouter;
