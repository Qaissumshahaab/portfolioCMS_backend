import mongoose from "mongoose";
import portfolio from "../model/portfolio";
import {
  sendemailtoportfolioOwner,
  returnconfirmationEmail,
} from "../services/emailService";
import clientscontacted from "../model/clientscontacted";
import signup from "../model/signup";

export const sendemailfromForm = async (req, res) => {
  try {
    const {
      sendername,
      senderemail,
      senderwhatsappNo,
      subjectbysender,
      descriptionbysender,
      portfolioid,
    } = req.body;

    if (
      !sendername ||
      !senderemail ||
      !subjectbysender ||
      !descriptionbysender ||
      !portfolioid
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(senderemail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }

    const findportfolio = await portfolio.findOne({ _id: portfolioid });

    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "portfolio not exist ,sorry" });
    }

    const findportfolioownerby_id = await signup.findOne({
      _id: findportfolio.userid,
    });

    if (!findportfolioownerby_id) {
      return res.status(404).json({
        success: false,
        message: "Portfolio owner not found",
      });
    }
    const portfolioownerEmail = findportfolioownerby_id.email;
    const portfolioownerusername = findportfolioownerby_id.username;

    await clientscontacted.create({
      sendername,
      senderemail,
      senderwhatsappNo,
      subjectbysender,
      descriptionbysender,
      portfolioid: portfolioid,
    });

    await sendemailtoportfolioOwner(
      sendername,
      senderemail,
      senderwhatsappNo,
      subjectbysender,
      descriptionbysender,
      portfolioownerEmail,
    );

    await returnconfirmationEmail(
      sendername,
      senderemail,
      portfolioownerusername,
    );
    return res.status(200).json({
      success: true,
      message: "Email send successfully , see confirmation email in your inbox",
    });
  } catch (error) {
    console.log("error occur in clientscontactedController");
    return res
      .status(400)
      .json({ success: false, message: "Error occur while contacting owner" });
  }
};
