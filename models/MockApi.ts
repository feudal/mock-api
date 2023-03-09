import mongoose from "mongoose";

const mockApiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  interface: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interface",
  },
  data: [{ type: Object }],
});

export const MockApi =
  mongoose.models.MockApi || mongoose.model("MockApi", mockApiSchema);
