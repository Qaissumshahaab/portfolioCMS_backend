import experience from "../model/experience";
import portfolio from "../model/portfolio";

export const createExperience = async (req, res, next) => {
  try {
    const { myexperience, experiencedtools } = req.body;
    const userid = req.user.userid;

    const findportfolio = await portfolio.findOne({ userid: userid });

    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Create portfolio first" });
    } else {
      const experienceInfo = await experience.findOne({
        portfolioid: findportfolio._id,
      });
      if (!experienceInfo) {
        const uniqueExperiencedTools = experiencedtools
          ? [...new Set(experiencedtools)]
          : [];
        const createexperienceInfo = await experience.create({
          myexperience,
          experiencedtools: uniqueExperiencedTools,
          portfolioid: findportfolio._id,
        });

        return res.status(200).json({
          success: true,
          message: "Experience information added successfully",
        });
      } else {
        const updateData = {};
        if (myexperience) {
          updateData.myexperience = myexperience;
        }
        if (experiencedtools?.length) {
          updateData.$addToSet = {
            experiencedtools: {
              $each: experiencedtools,
            },
          };
        }
        const updatecontactInfo = await experience.findOneAndUpdate(
          {
            portfolioid: findportfolio._id,
          },
          updateData,
          { new: true },
        );
        return res.status(200).json({
          success: true,
          message: "Experience information updated successfully",
        });
      }
    }
  } catch (error) {
    console.log("error occur in experienceController");
    return res.status(400).json({
      success: false,
      message: "Failed to create experience information",
    });
  }
};
