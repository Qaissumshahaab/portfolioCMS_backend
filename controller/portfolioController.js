import portfolio from "../model/portfolio";

export const createPortfolio = async (req, res, next) => {
  const userid = req.user.userid;
  try {
    const portfolio = await portfolio.findById({ userid: userid });
    if (portfolio) {
      return res.status(200).json({
        success: false,
        message: "Portfolio already present you can make only one portfolio",
      });
    } else {
      const createportfolio = await portfolio.create({
        userid: userid,
      });
      await createPortfolio.save();
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
