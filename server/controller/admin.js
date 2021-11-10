import User from "../model/admin.js";
import {
  ALREADY_EXIST,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIAL,
  OK
} from "../status.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginController = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const existUser = await User.findOne({ username });
    if (!existUser) {
      res.status(INVALID_CREDENTIAL);
      next(new Error(`User name with ${username} does not exist!`));
      return;
    }
    const comparePassword = await bcrypt.compare(password, existUser.password);

    if (!comparePassword) {
      res.status(INVALID_CREDENTIAL);
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
    next();
  } catch (e) {
    next(e);
  }
};

export const signupController = async (req, res, next) => {
  const { username, password } = req.body;

  if (username !== 0 && !username) {
    res.status(BAD_REQUEST);
    next(new Error("Missing username field!"));
    return;
  }

  if (password !== 0 && !password) {
    res.status(BAD_REQUEST);
    next(new Error("Missing password field!"));
    return;
  }

  const oldUser = await User.findOne({ username });
  if (oldUser) {
    res.status(ALREADY_EXIST);
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
    next();
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR);
    next(e);
  }
};
