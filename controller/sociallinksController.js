import sociallinks from "../model/socialLinks";
import portfolio from "../model/portfolio";

export const createSocialLinks = async (req, res) => {
  try {
    const {
      facebooklink,
      instagramlink,
      githublink,
      linkdinlink,
      leetcodelink,
    } = req.body;
    const userid = req.user.userid;
    const findportfolio = await portfolio.findOne({ userid });
    if (!findportfolio) {
      return res.status(400).json({
        success: false,
        message: "create portfolio first",
      });
    }
    const findsociallinksbyportfolioid = await sociallinks.findOne({
      portfolioid: findportfolio._id,
    });
    if (!findsociallinksbyportfolioid) {
      await sociallinks.create({
        facebooklink,
        instagramlink,
        githublink,
        linkdinlink,
        leetcodelink,
        portfolioid: findportfolio._id,
      });
      return res
        .status(200)
        .json({ success: true, message: "social links created successfully" });
    } else {
      const updateData = {};
      if (facebooklink) updateData.facebooklink = facebooklink;
      if (instagramlink) updateData.instagramlink = instagramlink;
      if (githublink) updateData.githublink = githublink;
      if (linkdinlink) updateData.linkdinlink = linkdinlink;
      if (leetcodelink) updateData.leetcodelink = leetcodelink;

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          message: "No fields provided to update",
        });
      }
      await sociallinks.findOneAndUpdate(
        { portfolioid: findportfolio._id },
        updateData,
        { new: true },
      );
      return res
        .status(200)
        .json({ success: true, message: "Social link updated successffully" });
    }
  } catch (error) {
    console.log("error occur in sociallinksController");
    return res.status(400).json({
      success: false,
      message: "Error occur while creating social links",
    });
  }
};

// GET social links for portfolio owner
export const getSocialLinks = async (req, res) => {
  try {
    const userid = req.user.userid;
    const findportfolio = await portfolio.findOne({ userid });

    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio not found" });
    }

    const sociallinksData = await sociallinks.findOne({
      portfolioid: findportfolio._id,
    });
    return res.status(200).json({ success: true, data: sociallinksData });
  } catch (error) {
    console.log("Error in getSocialLinks");
    return res
      .status(400)
      .json({ success: false, message: "Error fetching social links" });
  }
};

// GET social links by portfolio ID (public route)
export const getSocialLinksByPortfolioId = async (req, res) => {
  try {
    const { portfolioid } = req.params;
    const sociallinksData = await sociallinks.findOne({ portfolioid });
    return res.status(200).json({ success: true, data: sociallinksData });
  } catch (error) {
    console.log("Error in getSocialLinksByPortfolioId");
    return res
      .status(400)
      .json({ success: false, message: "Error fetching social links" });
  }
};

// DELETE social links
export const deleteSocialLinks = async (req, res) => {
  try {
    const userid = req.user.userid;
    const findportfolio = await portfolio.findOne({ userid });

    if (!findportfolio) {
      return res
        .status(400)
        .json({ success: false, message: "Portfolio not found" });
    }

    await sociallinks.findOneAndDelete({ portfolioid: findportfolio._id });
    return res
      .status(200)
      .json({ success: true, message: "Social links deleted successfully" });
  } catch (error) {
    console.log("Error in deleteSocialLinks");
    return res
      .status(400)
      .json({ success: false, message: "Error deleting social links" });
  }
};
