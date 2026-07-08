import mongoose from "mongoose";

const visitorsaggregatedanalyticsSchema = new mongoose.Schema(
  {
    portfolioid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "portfolio",
      unique: true,
      required: true,
    },

    totalVisitors: {
      type: Number,
      default: 0,
    },

    uniqueVisitors: {
      type: Number,
      default: 0,
    },

    countryStats: [
      {
        country: String,
        visitors: {
          type: Number,
          default: 0,
        },
      },
    ],

    topCountry: {
      type: String,
      default: "",
    },

    weeklyViews: [
      {
        week: String, // Example: "2026-W28"
        views: {
          type: Number,
          default: 0,
        },
      },
    ],

    monthlyViews: [
      {
        month: String, // Example: "2026-07"
        views: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const visitorsaggregatedanalytics = mongoose.model(
  "Visitorsaggregatedanalytics",
  visitorsaggregatedanalyticsSchema,
);

export default visitorsaggregatedanalytics;
