import about from "../model/about";
import portfolio from "../model/portfolio";

export const createAbout = async (req, res, next) => {
  const { biography, background, careerGoals, whatIenjoybuilding } = req.body;
  const userid = req.user.userid;
  try {
    const portfolio = await portfolio.findOne({ userid: userid });
    if (!portfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio not present" });
    } else {
      const about = await about.findOne({ portfolioid: portfolio._id });
      if (!about) {
        const createAbout = await about.create({
          biography: biography,
          background: background,
          careerGoals: careerGoals,
          whatIenjoybuilding: whatIenjoybuilding,
          portfolioid: portfolio._id,
        });
        await createAbout.save();
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
          { portfolioid: portfolio._id },
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
