import mongoose from "mongoose";

const sociallinksSchema = new mongoose.Schema({
  portfolioid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Portfolio",
  },
  facebooklink: {
    type: String,
  },
  instagramlink: {
    type: String,
  },
  githublink: {
    type: String,
  },
  linkdinlink: {
    type: String,
  },
  leetcodelink: {
    type: String,
  },
});

const sociallinks = mongoose.model("Sociallinks", sociallinksSchema);
export default sociallinks;
