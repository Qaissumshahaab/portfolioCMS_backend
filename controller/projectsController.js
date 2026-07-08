import project from "../model/projects";
import portfolio from "../model/portfolio";

export const createProject = async (req, res, next) => {
  try {
    const { name, githublink, livelink, technologiesused } = req.body;
    const userid = req.user.userid;
    const findportfolio = await portfolio.findOne({ userid: userid });
    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio not present" });
    }
    const findproject = await project.findOne({
      portfolioid: findportfolio._id,
    });
    if (!findproject) {
      const uniquetechnologiesused = technologiesused
        ? [...new Set(technologiesused)]
        : [];
      await project.create({
        project: {
          name,
          githublink,
          livelink,
          technologiesused: uniquetechnologiesused,
        },
        portfolioid: findportfolio._id,
      });
      return res
        .status(200)
        .json({ success: true, message: "Project is created successfuly" });
    } else {
      const updatedata = {};
      if (name) updatedata["project.name"] = name;
      if (githublink) updatedata["project.githublink"] = githublink;
      if (livelink) updatedata["project.livelink"] = livelink;
      if (technologiesused?.length) {
        updatedata.$addToSet = {
          "project.technologiesused": {
            $each: [...new Set(technologiesused)],
          },
        };
      }
      const updateexistingproject = await project.findOneAndUpdate(
        {
          portfolioid: findportfolio._id,
        },
        updatedata,
        { new: true },
      );
      return res
        .status(200)
        .json({ success: true, message: "Project updated successfully" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Error occur while creating project " });
  }
};
