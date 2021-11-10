import express from "express";
import { loginController, signupController } from "../controller/admin.js";

const adminRouter = express.Router();

adminRouter.use((req, res, next) => {
  req.endpoint = "/admin";
  next();
});

adminRouter.post("/login", loginController);

adminRouter.post("/signup", signupController);

adminRouter.get("/:id", (req, res, next) => {
  res.send({ message: req.params });
  next();
});

export default adminRouter;
