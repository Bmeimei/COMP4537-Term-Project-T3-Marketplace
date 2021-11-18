import { Item, User } from "../model/index.js";
import { ALREADY_EXIST, BAD_REQUEST, INVALID_CREDENTIAL, NOT_FOUND, OK } from "../statusCode.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import redisInstance, { DEFAULT_EXPIRATION_TIME } from "../redisInstance.js";

dotenv.config();
const redisClient = redisInstance.getConnection();

const isFieldValid = (field, fieldName, res, next) => {
  if (field !== 0 && !field) {
    res.status(BAD_REQUEST);
    next(new Error(`Missing '${fieldName}' field!`));
    return false;
  }
  return true;
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });

    if (!existUser) {
      res.status(INVALID_CREDENTIAL);
      next(new Error(`User Email with ${email} does not exist!`));
      return;
    }
    const comparePassword = await bcrypt.compare(password, existUser.password);

    if (!comparePassword) {
      res.status(INVALID_CREDENTIAL);
      next(new Error("Password is not correct!"));
      return;
    }

    // Check if redis caches this token
    const cacheToken = await redisClient.get(`userToken ${email}`);

    if (cacheToken) {
      res.status(OK).send({ message: "Success!", token: cacheToken });
      next();
      return;
    }
    const token = jwt.sign(
      {
        email,
        id: existUser._id
      },
      process.env.USER_ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d"
      }
    );
    res.status(OK).send({ message: "Success!", token });
    next();
    await redisClient.set(`userToken ${email}`, token, { EX: DEFAULT_EXPIRATION_TIME });
  } catch (e) {
    next(e);
  }
};

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
        email,
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
    await redisClient.set(`userToken ${email}`, token, { EX: DEFAULT_EXPIRATION_TIME });
  } catch (e) {
    if (e?.code === 11000) {
      res.status(ALREADY_EXIST);
      next(new Error("Email already exists!"));
      return;
    }
    next(e);
  }
};

export const getUserController = async (req, res, next) => {
  const userId = req?.userId;
  if (userId !== 0 && !userId) {
    res.status(INVALID_CREDENTIAL);
    next(new Error("Missing User Id!"));
    return;
  }
  try {
    // Add lean() so we can add items to the user
    const user = await User.findById(userId).select("_id email username profile").lean().exec();

    if (!user) {
      res.status(NOT_FOUND);
      next(new Error("User Not Found!"));
      return;
    }
    user.items = await Item.find({ user: userId }).select("-user").lean().exec();
    res.status(OK).send({
      user,
      message: "Success"
    });
  } catch (e) {
    next(e);
  }
};
