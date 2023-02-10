import mongoose from "mongoose";

const mockApiSchema = new mongoose.Schema(
  { name: { type: String, required: true } },
  { timestamps: true }
);

export const MockApi =
  mongoose.models.MockApi || mongoose.model("MockApi", mockApiSchema);
