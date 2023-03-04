import mongoose from "mongoose";

const mockApiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  data: [{ type: Object }],
});

export const MockApi =
  mongoose.models.MockApi || mongoose.model("MockApi", mockApiSchema);
