import mongoose from "mongoose";

const sociallinksSchema = new mongoose.Schema({
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
    ttype: String,
  },
});

const sociallinks = mongoose.model("Sociallinks", sociallinksSchema);
export default sociallinks;
