import mongoose from "mongoose";

const User = mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      index: true
    },
    username: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
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
