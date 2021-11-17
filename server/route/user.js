import express from "express";
import { getUserController, loginController, signupController } from "../controller/user.js";
import { auth } from "../auth.js";

const userRouter = express.Router();

userRouter.use((req, res, next) => {
  req.endpoint = "/user";
  next();
});

userRouter.get("/", auth, getUserController);
userRouter.post("/login", loginController);
userRouter.post("/signup", signupController);

export default userRouter;
