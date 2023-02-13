import mongoose from "mongoose";

const mockApiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  count: { type: Number, required: true },
  fields: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Field",
    },
  ],
});

export const MockApi =
  mongoose.models.MockApi || mongoose.model("MockApi", mockApiSchema);
