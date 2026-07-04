import mongoose from "mongoose";

const homapageSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  title: {
    type: String,
  },
  introduction: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  portfolioid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "portfolio",
    required: true,
  },
});

const homepage = mongoose.model("Homepage", homapageSchema);
export default homepage;
