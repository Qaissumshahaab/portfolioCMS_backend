import contact from "../model/contact";
import portfolio from "../model/portfolio";

export const createContact = async (req, res, next) => {
  try {
    const { email, phoneNo, whatsappNo } = req.body;
    const userid = req.user.userid;

    const findportfolio = await portfolio.findOne({ userid: userid });
    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Create portfolio first" });
    } else {
      const contactInfo = await contact.findOne({
        portfolioid: findportfolio._id,
      });
      if (!contactInfo) {
        const createContactInfo = await contact.create({
          email,
          phoneNo,
          whatsappNo,
          portfolioid: findportfolio._id,
        });

        return res.status(200).json({
          success: true,
          message: "Contact information added successfully",
        });
      } else {
        const updateData = {};
        if (email) updateData.email = email;
        if (phoneNo) updateData.phoneNo = phoneNo;
        if (whatsappNo) updateData.whatsappNo = whatsappNo;

        const updatecontactInfo = await contact.findOneAndUpdate(
          {
            portfolioid: findportfolio._id,
          },
          updateData,
          { new: true },
        );
        return res.status(200).json({
          success: true,
          message: "Contact information added successfully",
        });
      }
    }
  } catch (error) {
    console.log("error occur in contactController");
    return res
      .status(400)
      .json({ success: false, message: "Failed to create contactInfo" });
  }
};

// GET contact info for portfolio owner
export const getContact = async (req, res, next) => {
  try {
    const userid = req.user.userid;
    const findportfolio = await portfolio.findOne({ userid });

    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio not found" });
    }

    const contactInfo = await contact.findOne({
      portfolioid: findportfolio._id,
    });
    return res.status(200).json({ success: true, data: contactInfo });
  } catch (error) {
    console.log("Error in getContact");
    return res
      .status(400)
      .json({ success: false, message: "Error fetching contact info" });
  }
};

// GET contact by portfolio ID (public route)
export const getContactByPortfolioId = async (req, res, next) => {
  try {
    const { portfolioid } = req.params;
    const contactInfo = await contact.findOne({ portfolioid });
    return res.status(200).json({ success: true, data: contactInfo });
  } catch (error) {
    console.log("Error in getContactByPortfolioId");
    return res
      .status(400)
      .json({ success: false, message: "Error fetching contact info" });
  }
};

// DELETE contact info
export const deleteContact = async (req, res, next) => {
  try {
    const userid = req.user.userid;
    const findportfolio = await portfolio.findOne({ userid });

    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio not found" });
    }

    await contact.findOneAndDelete({ portfolioid: findportfolio._id });
    return res
      .status(200)
      .json({ success: true, message: "Contact info deleted successfully" });
  } catch (error) {
    console.log("Error in deleteContact");
    return res
      .status(400)
      .json({ success: false, message: "Error deleting contact info" });
  }
};
