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
