import mongoose from "mongoose";

const Category = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Category", Category);
