import mongoose from "mongoose";

const apiData = new mongoose.Schema({
  api: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MockApi",
  },
  data: { type: Object },
});

export const ApiData =
  mongoose.models.ApiData || mongoose.model("ApiData", apiData);
