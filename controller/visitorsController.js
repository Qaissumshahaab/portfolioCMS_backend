import { v4 as uuidv4 } from "uuid";
import geoip from "geoip-lite";

import visitor from "../model/peruniquevisitors";
import visitorsaggregatedanalytics from "../model/visitorsaggregatedanalytics";

export const visitPortfolio = async (req, res, next) => {
  try {
    const { portfolioid } = req.params;

    let visitorId = req.cookies.visitorId;

    if (!visitorId) {
      visitorId = uuidv4();

      res.cookie("visitorId", visitorId, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      });
    }

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

    const geo = geoip.lookup(ip);

    const country = geo?.country || "Unknown";

    const today = new Date();

    const week = `${today.getFullYear()}-W${Math.ceil(today.getDate() / 7)}`;

    const month = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, "0")}`;

    const THIRTY_MINUTES = 30 * 60 * 1000;

    let analytics = await visitorsaggregatedanalytics.findOne({
      portfolioid,
    });

    if (!analytics) {
      analytics = await visitorsaggregatedanalytics.create({
        portfolioid,
      });
    }

    const existingVisitor = await visitor.findOne({
      portfolioid,
      visitorId,
    });

    // ---------------- FIRST VISIT ----------------

    if (!existingVisitor) {
      await visitor.create({
        portfolioid,
        visitorId,
        country,
        ipAddress: ip,
      });

      analytics.totalVisitors += 1;
      analytics.uniqueVisitors += 1;

      const countryExists = analytics.countryStats.find(
        (item) => item.country === country,
      );

      if (countryExists) {
        countryExists.visitors += 1;
      } else {
        analytics.countryStats.push({
          country,
          visitors: 1,
        });
      }

      const weekExists = analytics.weeklyViews.find(
        (item) => item.week === week,
      );

      if (weekExists) {
        weekExists.views += 1;
      } else {
        analytics.weeklyViews.push({
          week,
          views: 1,
        });
      }

      const monthExists = analytics.monthlyViews.find(
        (item) => item.month === month,
      );

      if (monthExists) {
        monthExists.views += 1;
      } else {
        analytics.monthlyViews.push({
          month,
          views: 1,
        });
      }
    }

    // ---------------- RETURNING VISITOR ----------------
    else {
      existingVisitor.visitCount += 1;

      const currentTime = new Date();

      const difference =
        currentTime.getTime() - existingVisitor.lastVisited.getTime();

      if (difference >= THIRTY_MINUTES) {
        analytics.totalVisitors += 1;

        const weekExists = analytics.weeklyViews.find(
          (item) => item.week === week,
        );

        if (weekExists) {
          weekExists.views += 1;
        } else {
          analytics.weeklyViews.push({
            week,
            views: 1,
          });
        }

        const monthExists = analytics.monthlyViews.find(
          (item) => item.month === month,
        );

        if (monthExists) {
          monthExists.views += 1;
        } else {
          analytics.monthlyViews.push({
            month,
            views: 1,
          });
        }

        existingVisitor.lastVisited = currentTime;
      }

      await existingVisitor.save();
    }

    if (analytics.countryStats.length > 0) {
      analytics.topCountry = analytics.countryStats.reduce((prev, current) =>
        current.visitors > prev.visitors ? current : prev,
      ).country;
    }

    await analytics.save();

    return res.status(200).json({
      success: true,
      message: "Visit recorded successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error while recording visit",
    });
  }
};
