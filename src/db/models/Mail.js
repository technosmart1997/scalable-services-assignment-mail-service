import mongoose from "mongoose";

export const mailSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    sentAt: {
      type: String,
      required: true,
    },
  },
  {
    collection: "mail",
    timestamps: true,
  }
);

export const Mail = mongoose.model("mail", mailSchema);
