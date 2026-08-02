import express from "express";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken.js";
import {
  createContact,
  getContact,
  getContactByPortfolioId,
  deleteContact,
} from "../controller/contactController.js";

const contactRouter = express.Router();

contactRouter.post("/createcontact", verifyUseraccesstoken, createContact);
contactRouter.get("/getcontact", verifyUseraccesstoken, getContact);
contactRouter.get("/getcontact/:portfolioid", getContactByPortfolioId);
contactRouter.post("/deletecontact", verifyUseraccesstoken, deleteContact);

export default contactRouter;
