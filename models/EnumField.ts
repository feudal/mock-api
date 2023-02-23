import mongoose from "mongoose";

export const EnumFieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  choices: { type: Array, required: true },
});

export let EnumField: any;
if (!mongoose.models.EnumField) {
  EnumField = mongoose.model("EnumField", EnumFieldSchema);
} else {
  EnumField = mongoose.models.EnumField;
}
