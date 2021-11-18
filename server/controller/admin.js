import AdminUser from "../model/admin.js";
import {
  ALREADY_EXIST,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIAL,
  OK
} from "../statusCode.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import redisInstance, { DEFAULT_EXPIRATION_TIME } from "../redisInstance.js";

dotenv.config();
const redisClient = redisInstance.getConnection();

export const loginController = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const existUser = await AdminUser.findOne({ username });
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

    // Check if redis caches this token
    const cacheToken = await redisClient.get(`adminToken ${username}`);

    if (cacheToken) {
      res.status(OK).send({ message: "Success!", token: cacheToken });
      next();
      return;
    }

    const token = jwt.sign(
      {
        username,
        id: existUser._id
      },
      process.env.ADMIN_ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(OK).send({ message: "Success!", token });

    await redisClient.set(`adminToken ${username}`, token, { EX: DEFAULT_EXPIRATION_TIME });

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

  const oldUser = await AdminUser.findOne({ username });
  if (oldUser) {
    res.status(ALREADY_EXIST);
    next(new Error("User already exists!"));
    return;
  }

  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const result = await AdminUser.create({ username, password: hashPassword });
    const token = jwt.sign(
      {
        username,
        id: result._id
      },
      process.env.ADMIN_ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.status(OK).send({ username, message: "Success!", token });

    await redisClient.set(`adminToken ${username}`, token, { EX: DEFAULT_EXPIRATION_TIME });
    next();
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR);
    next(e);
  }
};
