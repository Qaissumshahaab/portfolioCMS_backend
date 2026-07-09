import about from "../model/about";
import portfolio from "../model/portfolio";

export const createAbout = async (req, res, next) => {
  try {
    const { biography, background, careerGoals, whatIenjoybuilding } = req.body;
    const userid = req.user.userid;

    const findportfolio = await portfolio.findOne({ userid: userid });
    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio not present" });
    } else {
      const findabout = await about.findOne({ portfolioid: findportfolio._id });
      if (!findabout) {
        const createAbout = await about.create({
          biography: biography,
          background: background,
          careerGoals: careerGoals,
          whatIenjoybuilding: whatIenjoybuilding,
          portfolioid: findportfolio._id,
        });

        return res
          .status(200)
          .json({ success: true, message: "About section added successfully" });
      } else {
        const updateData = {};

        if (biography) updateData.biography = biography;
        if (background) updateData.background = background;
        if (careerGoals) updateData.careerGoals = careerGoals;
        if (whatIenjoybuilding)
          updateData.whatIenjoybuilding = whatIenjoybuilding;

        const updateAbout = await about.findOneAndUpdate(
          { portfolioid: findportfolio._id },
          updateData,
          { new: true },
        );
        return res.status(200).json({
          success: true,
          message: "About section updated successfully",
        });
      }
    }
  } catch (error) {
    console.log("Some error occur in about controller");
    return res
      .status(200)
      .json({ success: false, message: "Cannot create about section" });
  }
};

// GET about section for portfolio owner
export const getAbout = async (req, res, next) => {
  try {
    const userid = req.user.userid;
    const findportfolio = await portfolio.findOne({ userid });

    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio not found" });
    }

    const aboutData = await about.findOne({ portfolioid: findportfolio._id });

    if (!aboutData) {
      return res.status(200).json({ success: true, data: null });
    }

    return res.status(200).json({ success: true, data: aboutData });
  } catch (error) {
    console.log("Error in getAbout");
    return res
      .status(400)
      .json({ success: false, message: "Error fetching about section" });
  }
};

// GET about section by portfolio ID (public route)
export const getAboutByPortfolioId = async (req, res, next) => {
  try {
    const { portfolioid } = req.params;
    const aboutData = await about.findOne({ portfolioid });

    if (!aboutData) {
      return res.status(200).json({ success: true, data: null });
    }

    return res.status(200).json({ success: true, data: aboutData });
  } catch (error) {
    console.log("Error in getAboutByPortfolioId");
    return res
      .status(400)
      .json({ success: false, message: "Error fetching about section" });
  }
};

// DELETE about section
export const deleteAbout = async (req, res, next) => {
  try {
    const userid = req.user.userid;
    const findportfolio = await portfolio.findOne({ userid });

    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio not found" });
    }

    await about.findOneAndDelete({ portfolioid: findportfolio._id });

    return res
      .status(200)
      .json({ success: true, message: "About section deleted successfully" });
  } catch (error) {
    console.log("Error in deleteAbout");
    return res
      .status(400)
      .json({ success: false, message: "Error deleting about section" });
  }
};
