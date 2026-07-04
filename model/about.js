import mongoose from "mongoose";
const aboutSchema = new mongoose.Schema({
  biography: {
    type: String,
  },
  background: {
    type: String,
  },
  careerGoals: {
    type: String,
  },
  whatIenjoybuilding: {
    type: String,
  },
  portfolioid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "portfolio",
    required: true,
  },
});

const about = mongoose.model("About", aboutSchema);
export default about;
