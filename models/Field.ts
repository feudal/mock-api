import mongoose from "mongoose";

export const FieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: Array, required: true },
});

export let Field: any;
if (!mongoose.models.Field) {
  Field = mongoose.model("Field", FieldSchema);
} else {
  Field = mongoose.models.Field;
}
