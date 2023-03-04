import mongoose from "mongoose";

const interfaceSchema = new mongoose.Schema({
  name: String,
  fields: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Field",
    },
  ],
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

export const Interface =
  mongoose.models.Interface || mongoose.model("Interface", interfaceSchema);
