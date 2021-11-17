import mongoose from "mongoose";

const Endpoint = mongoose.Schema(
  {
    endpoint: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: true
    },
    requests: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Endpoint", Endpoint);
