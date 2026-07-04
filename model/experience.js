import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  myexperience: {
    type: String,
  },
  experiencedtools: {
    type: [String],
  },
  portfolioid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "portfolio",
    required: true,
  },
});

const experience = mongoose.model("Experience", experienceSchema);
export default experience;
