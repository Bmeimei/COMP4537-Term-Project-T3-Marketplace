import { User } from "../model/index.js";
import { ALREADY_EXIST, BAD_REQUEST, INVALID_CREDENTIAL, OK } from "../statusCode.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const isFieldValid = (field, fieldName, res, next) => {
  if (field !== 0 && !field) {
    res.status(BAD_REQUEST);
    next(new Error(`Missing '${fieldName}' field!`));
    return false;
  }
  return true;
};

export const loginController = async (req, res, next) => {};

export const signupController = async (req, res, next) => {
  const { email, username, password } = req.body;
  if (!isFieldValid(email, "email", res, next)) {
    return;
  }
  if (!isFieldValid(username, "username", res, next)) {
    return;
  }
  if (!isFieldValid(password, "password", res, next)) {
    return;
  }
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      username,
      email,
      password: hashPassword
    });
    const token = jwt.sign(
      {
        username,
        id: result._id
      },
      process.env.USER_ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d"
      }
    );
    res.status(OK).send({
      message: "Success",
      user: result,
      token
    });
    next();
  } catch (e) {
    if (e.code === 11000) {
      res.status(ALREADY_EXIST);
      next(new Error("Email already exists!"));
      return;
    }
    next(e);
  }
};

export const getUserController = async (req, res, next) => {};
