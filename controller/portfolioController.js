import portfolio from "../model/portfolio";

export const createPortfolio = async (req, res, next) => {
  try {
    const userid = req.user?.userid;

    const findportfolio = await portfolio.findOne({ userid: userid });
    if (findportfolio) {
      return res.status(200).json({
        success: false,
        message: "Portfolio already present you can make only one portfolio",
      });
    } else {
      const createportfolio = await portfolio.create({
        userid: userid,
      });

      return res
        .status(200)
        .json({ success: true, message: "Start creating your portfolio" });
    }
  } catch (error) {
    console.log("error in portfolioController");
    return res.status(400).json({
      success: false,
      message: "error occur while creating portfolio",
    });
  }
};
