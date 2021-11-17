import express from "express";
import { getUserController, loginController, signupController } from "../controller/user.js";

const userRouter = express.Router();

userRouter.use((req, res, next) => {
  req.endpoint = "/user";
  next();
});

userRouter.get("/", getUserController);
userRouter.post("/login", loginController);
userRouter.post("/signup", signupController);

export default userRouter;
