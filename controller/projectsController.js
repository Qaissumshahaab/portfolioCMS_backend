import project from "../model/projects.js";
import portfolio from "../model/portfolio.js";

// CREATE - always inserts a NEW project document (a portfolio can now have
// many projects, same collection-style pattern as blog posts).
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

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Project name is required" });
    }

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
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Error occur while creating project " });
  }
};

// UPDATE - a specific project, identified by projectid, owned by the signed-in user.
// technologiesused keeps the existing $addToSet (add-only) behaviour used across
// the rest of this backend; name/githublink/livelink are replaced directly.
export const updateProject = async (req, res, next) => {
  try {
    const { projectid, name, githublink, livelink, technologiesused } = req.body;
    const userid = req.user.userid;

    if (!projectid) {
      return res
        .status(400)
        .json({ success: false, message: "projectid is required" });
    }

    const findportfolio = await portfolio.findOne({ userid });
    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio not found" });
    }

    const findproject = await project.findOne({
      _id: projectid,
      portfolioid: findportfolio._id,
    });
    if (!findproject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

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

    await project.findOneAndUpdate(
      { _id: projectid, portfolioid: findportfolio._id },
      updatedata,
      { new: true },
    );

    return res
      .status(200)
      .json({ success: true, message: "Project updated successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Error occur while updating project " });
  }
};

// GET all projects for the signed-in user's portfolio (now potentially many)
export const getProjects = async (req, res, next) => {
  try {
    const userid = req.user.userid;
    const findportfolio = await portfolio.findOne({ userid });

    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio not found" });
    }

    const projects = await project.find({ portfolioid: findportfolio._id });
    return res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.log("Error in getProjects");
    return res
      .status(400)
      .json({ success: false, message: "Error fetching projects" });
  }
};

// GET projects by portfolio ID (public route)
export const getProjectsByPortfolioId = async (req, res, next) => {
  try {
    const { portfolioid } = req.params;
    const projects = await project.find({ portfolioid });
    return res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.log("Error in getProjectsByPortfolioId");
    return res
      .status(400)
      .json({ success: false, message: "Error fetching projects" });
  }
};

// DELETE a specific project by projectid (owned by the signed-in user)
export const deleteProject = async (req, res, next) => {
  try {
    const { projectid } = req.body;
    const userid = req.user.userid;

    if (!projectid) {
      return res
        .status(400)
        .json({ success: false, message: "projectid is required" });
    }

    const findportfolio = await portfolio.findOne({ userid });
    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio not found" });
    }

    const deleted = await project.findOneAndDelete({
      _id: projectid,
      portfolioid: findportfolio._id,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProject");
    return res
      .status(400)
      .json({ success: false, message: "Error deleting project" });
  }
};
