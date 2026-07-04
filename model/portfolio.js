import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const portfolio = mongoose.model("Portfolio", portfolioSchema);
export default portfolio;
