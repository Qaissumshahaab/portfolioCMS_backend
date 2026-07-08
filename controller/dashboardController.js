import visitorsaggregatedanalytics from "../model/visitorsaggregatedanalytics";
import portfolio from "../model/portfolio";

export const getPortfolioAnalytics = async (req, res, next) => {
  try {
    const userid = req.user.userid;

    // Find the user's portfolio
    const findportfolio = await portfolio.findOne({
      userid,
    });

    if (!findportfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    // Find analytics for this portfolio
    const analytics = await visitorsaggregatedanalytics.findOne({
      portfolioid: findportfolio._id,
    });

    if (!analytics) {
      return res.status(200).json({
        success: true,
        analytics: {
          totalVisitors: 0,
          uniqueVisitors: 0,
          topCountry: "",
          countryStats: [],
          weeklyViews: [],
          monthlyViews: [],
        },
      });
    }

    return res.status(200).json({
      success: true,
      analytics: {
        totalVisitors: analytics.totalVisitors,
        uniqueVisitors: analytics.uniqueVisitors,
        topCountry: analytics.topCountry,
        countryStats: analytics.countryStats,
        weeklyViews: analytics.weeklyViews,
        monthlyViews: analytics.monthlyViews,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error while fetching analytics",
    });
  }
};
