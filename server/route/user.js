import express from "express";

const userRouter = express.Router();

userRouter.use((req, res, next) => {
  req.endpoint = "/user";
  next();
});

userRouter.get("/", (req, res, next) => {
  res.send({
    message: "Hello User!"
  });
  next();
});

export default userRouter;
