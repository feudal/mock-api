import mongoose from "mongoose";

const interfaceSchema = new mongoose.Schema({
  name: String,
  isDefault: {
    type: Boolean,
    default: false,
  },
  fields: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Field",
    },
  ],
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

export const Interface =
  mongoose.models.Interface || mongoose.model("Interface", interfaceSchema);
