import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  whatsappNo: {
    type: String,
  },
  portfolioid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "portfolio",
    required: true,
  },
});

const contact = mongoose.model("Contact", contactSchema);
export default contact;
