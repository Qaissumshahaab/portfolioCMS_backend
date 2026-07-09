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

// GET experience for portfolio owner
export const getExperience = async (req, res, next) => {
  try {
    const userid = req.user.userid;
    const findportfolio = await portfolio.findOne({ userid });

    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio not found" });
    }

    const experienceData = await experience.findOne({
      portfolioid: findportfolio._id,
    });
    return res.status(200).json({ success: true, data: experienceData });
  } catch (error) {
    console.log("Error in getExperience");
    return res
      .status(400)
      .json({ success: false, message: "Error fetching experience" });
  }
};

// GET experience by portfolio ID (public route)
export const getExperienceByPortfolioId = async (req, res, next) => {
  try {
    const { portfolioid } = req.params;
    const experienceData = await experience.findOne({ portfolioid });
    return res.status(200).json({ success: true, data: experienceData });
  } catch (error) {
    console.log("Error in getExperienceByPortfolioId");
    return res
      .status(400)
      .json({ success: false, message: "Error fetching experience" });
  }
};

// DELETE experience
export const deleteExperience = async (req, res, next) => {
  try {
    const userid = req.user.userid;
    const findportfolio = await portfolio.findOne({ userid });

    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio not found" });
    }

    await experience.findOneAndDelete({ portfolioid: findportfolio._id });
    return res
      .status(200)
      .json({ success: true, message: "Experience deleted successfully" });
  } catch (error) {
    console.log("Error in deleteExperience");
    return res
      .status(400)
      .json({ success: false, message: "Error deleting experience" });
  }
};
