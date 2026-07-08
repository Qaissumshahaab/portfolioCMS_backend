import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    portfolioid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "portfolio",
      required: true,
    },

    visitorId: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      default: "Unknown",
    },

    ipAddress: {
      type: String,
    },

    visitCount: {
      type: Number,
      default: 1,
    },

    lastVisited: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// One document per visitor per portfolio
visitorSchema.index({ portfolioid: 1, visitorId: 1 }, { unique: true });

const visitor = mongoose.model("Visitor", visitorSchema);

export default visitor;
