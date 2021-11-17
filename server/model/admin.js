import mongoose from "mongoose";

const AdminUser = mongoose.Schema(
  {
    username: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("AdminUser", AdminUser);
