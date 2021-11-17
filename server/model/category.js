import mongoose from "mongoose";

const Category = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      index: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Category", Category);
