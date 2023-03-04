import mongoose from "mongoose";

export const FieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: Array, required: true },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

export let Field: any;
if (!mongoose.models.Field) {
  Field = mongoose.model("Field", FieldSchema);
} else {
  Field = mongoose.models.Field;
}
