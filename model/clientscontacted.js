import mongoose from "mongoose";

const clientscontactedSchema = new mongoose.Schema({
  sendername: {
    type: String,
    required: true,
  },
  senderemail: {
    type: String,
    required: true,
  },
  senderwhatsappNo: {
    type: String,
    required: true,
  },
  subjectbysender: {
    type: String,
    required: true,
  },
  descriptionbysender: {
    type: String,
    required: true,
  },
  portfolioid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "portfolio",
    required: true,
  },
});
const clientscontacted = mongoose.model(
  "Clientscontacted",
  clientscontactedSchema,
);
export default clientscontacted;
