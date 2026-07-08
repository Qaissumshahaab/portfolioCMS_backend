import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  project: {
    // i can make only by fields instead of making field on project object as it will be easily distinguishable too because everyone knows it is project schema------ i just did that for learning purpose so i can see controller be made.
    name: {
      type: String,
    },
    githublink: {
      type: String,
    },
    livelink: {
      type: String,
    },
    technologiesused: [String],
  },

  portfolioid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "portfolio",
    required: true,
  },
});

const project = mongoose.model("Project", projectSchema);
export default project;
