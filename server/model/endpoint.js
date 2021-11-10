import mongoose from "mongoose";

const Endpoint = mongoose.Schema(
  {
    endpoint: {
      type: String,
      require: true
    },
    method: {
      type: String,
      require: true
    },
    requests: {
      type: Number,
      require: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Endpoint", Endpoint);
