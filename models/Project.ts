import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  mockApis: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MockApi",
    },
  ],
});

export const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
