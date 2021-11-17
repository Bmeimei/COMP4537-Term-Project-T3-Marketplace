import mongoose from "mongoose";

const Item = mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    price: {
      type: Number,
      require: true
    },
    description: {
      type: String,
      require: true
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      require: true
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Item", Item);
