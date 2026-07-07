import portfolio from "../model/portfolio";
import skills from "../model/skills";

export const addSkills = async (req, res, next) => {
  try {
    const {
      languages,
      frontendFramework,
      backendFramework,
      toolsandecosystem,
    } = req.body;
    const userid = req.user.userid;

    const findportfolio = await portfolio.findOne({ userid: userid });
    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "portfolio not present" });
    } else {
      const findskills = await skills.findOne({
        portfolioid: findportfolio._id,
      });
      if (!findskills) {
        const uniqueLanguages = [...new Set(languages ?? [])]; //if language then language otherwise empty array //new Set() removes duplicates and ?? ensure if languages is not present it become empty array instaed of null or undefind so new Set() does not break. // Set is javascript object that take unique values.

        const uniqueFrontendFramework = [...new Set(frontendFramework ?? [])];
        const uniqueBackendFramework = [...new Set(backendFramework ?? [])];
        const uniqueToolsAndEcosystem = [...new Set(toolsandecosystem ?? [])];

        const createskills = await skills.create({
          languages: uniqueLanguages,
          frontendFramework: uniqueFrontendFramework,
          backendFramework: uniqueBackendFramework,
          toolsandecosystem: uniqueToolsAndEcosystem,
          portfolioid: findportfolio._id,
        });

        return res
          .status(200)
          .json({ success: true, message: "Skills added successfully" });
      } else {
        const update = {};

        if (req.body.languages?.length) {
          update.languages = { $each: req.body.languages };
        }

        if (req.body.frontendFramework?.length) {
          update.frontendFramework = {
            $each: req.body.frontendFramework,
          };
        }

        if (req.body.backendFramework?.length) {
          update.backendFramework = {
            $each: req.body.backendFramework,
          };
        }

        if (req.body.toolsandecosystem?.length) {
          update.toolsandecosystem = {
            $each: req.body.toolsandecosystem,
          };
        }

        const updateskills = await skills.findOneAndUpdate(
          { portfolioid: findportfolio._id },
          {
            $addToSet: update, // $push does not ensure removing duplicate values in array
          }, // $addToSet ensure removing any duplicate values in array eg:[java,java]
          { new: true },
        );
        return res
          .status(200)
          .json({ success: true, message: "Skills updated successfully" });
      }
    }
  } catch (error) {
    console.log("error occur in skill controller");
    return res
      .status(400)
      .json({ success: false, message: "Cannot add skills" });
  }
};
/*
front end send skills like this ;
{
  "languages": ["JavaScript", "Python"],
  "frontendFramework": ["React", "Next.js"]
}
  */
