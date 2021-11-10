import express from "express";
import User from "../model/admin.js";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "../status.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const adminRouter = express.Router();

adminRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const existUser = await User.findOne({ username });
    if (!existUser) {
      res.status(BAD_REQUEST);
      next(new Error(`User name with ${username} does not exist!`));
      return;
    }
    const comparePassword = await bcrypt.compare(password, existUser.password);

    if (!comparePassword) {
      res.status(BAD_REQUEST);
      next(new Error("Password is not correct!"));
      return;
    }

    const token = jwt.sign(
      {
        username,
        id: existUser._id
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.status(OK).send({ message: "Success!", token });
  } catch (e) {
    next(e);
  }
});

adminRouter.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  const oldUser = await User.findOne({ username });
  if (oldUser) {
    res.status(BAD_REQUEST);
    next(new Error("User already exists!"));
    return;
  }
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const result = await User.create({ username, password: hashPassword });
    const token = jwt.sign(
      {
        username,
        id: result._id
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.status(OK).send({ username, message: "Success!", token });
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR);
    next(e);
  }
});

export default adminRouter;
