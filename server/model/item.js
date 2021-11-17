import mongoose from "mongoose";

const Item = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    isValid: {
      type: Boolean,
      default: true
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Item", Item);
