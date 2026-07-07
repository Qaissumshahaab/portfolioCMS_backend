import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  resumePic: {
    type: Object,
  },
  portfolioid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Portfolio",
    required: true,
  },
});
const resume = mongoose.model("Resume", resumeSchema);
export default resume;
