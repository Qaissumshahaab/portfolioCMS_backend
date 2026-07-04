import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  resume: {
    type: String,
  },
  portfolioid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Portfolio",
    required: true,
  },
});
const resume = mongoose.model("Resume", resumeSchema);
export default resume;
