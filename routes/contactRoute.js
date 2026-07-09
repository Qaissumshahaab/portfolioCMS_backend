import express from "express";
import verifyUseraccesstoken from "../middleware/verifyUseraccesstoken";
import {
  createContact,
  getContact,
  getContactByPortfolioId,
  deleteContact,
} from "../controller/contactController";

const contactRouter = express.Router();

contactRouter.post("/createcontact", verifyUseraccesstoken, createContact);
contactRouter.get("/getcontact", verifyUseraccesstoken, getContact);
contactRouter.get("/getcontact/:portfolioid", getContactByPortfolioId);
contactRouter.post("/deletecontact", verifyUseraccesstoken, deleteContact);

export default contactRouter;
