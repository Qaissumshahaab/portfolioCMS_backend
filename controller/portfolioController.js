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

// GET portfolio for authenticated user
export const getPortfolio = async (req, res, next) => {
  try {
    const userid = req.user?.userid;
    const portfolioData = await portfolio.findOne({ userid });

    if (!portfolioData) {
      return res.status(200).json({ success: true, data: null });
    }

    return res.status(200).json({ success: true, data: portfolioData });
  } catch (error) {
    console.log("Error in getPortfolio");
    return res
      .status(400)
      .json({ success: false, message: "Error fetching portfolio" });
  }
};

// GET portfolio by user ID (public route)
export const getPortfolioByUserId = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const portfolioData = await portfolio.findOne({ userid });

    if (!portfolioData) {
      return res.status(200).json({ success: true, data: null });
    }

    return res.status(200).json({ success: true, data: portfolioData });
  } catch (error) {
    console.log("Error in getPortfolioByUserId");
    return res
      .status(400)
      .json({ success: false, message: "Error fetching portfolio" });
  }
};
