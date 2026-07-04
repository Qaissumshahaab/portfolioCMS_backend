import portfolio from "../model/portfolio";
import skills from "../model/skills";

export const addSkills = async (req, res, next) => {
  const { languages, frontendFramework, backendFramework, toolsandecosystem } =
    req.body;
  const userid = req.user.userid;
  try {
    const portfolio = await portfolio.findById({ userid: userid });
    if (!portfolio) {
      return res
        .status(400)
        .json({ success: false, message: "portfolio not present" });
    } else {
      const skills = await skills.findById({ portfolioid: portfolio._id });
      if (!skills) {
        const createskills = await skills.create({
          languages: languages,
          frontendFramework: frontendFramework,
          backendFramework: backendFramework,
          toolsandecosystem: toolsandecosystem,
          portfolioid: portfolio._id,
        });
        await createskills.save();
        return res
          .status(200)
          .json({ success: true, message: "Skills added successfully" });
      } else {
        const update = {};

        if (req.body.languages?.length) {
          update.languages = { $each: req.body.languages };
        }

        if (req.body.frontendFrameworks?.length) {
          update.frontendFrameworks = {
            $each: req.body.frontendFrameworks,
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
          { portfolioid: portfolio._id },
          {
            $push: update,
          },
          { new: true },
        );
        return res
          .status(200)
          .json({ success: true, message: "Skills added successfully" });
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
  "frontendFrameworks": ["React", "Next.js"]
}
  */
