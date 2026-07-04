import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  languages: [String],
  frontendFramework: [String],
  backendFramework: [String],
  toolsandecosystem: [String],

  portfolioid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Portfolio",
    required: true,
  },
});

const skills = mongoose.model("Skills", skillSchema);
export default skills;
