import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const User = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: [isEmail, "Please use an valid Email!"]
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    profile: {
      type: String,
      default: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", User);
