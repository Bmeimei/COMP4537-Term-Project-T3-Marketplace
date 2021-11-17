// User Auth
import jwt from "jsonwebtoken";
import { INVALID_CREDENTIAL } from "./statusCode.js";
import dotenv from "dotenv";

dotenv.config();

export const auth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization.split(" ")[1];
    const { id: userId } = jwt.verify(token, process.env.USER_ACCESS_TOKEN_SECRET);
    req.userId = userId;
    next();
  } catch (e) {
    res.status(INVALID_CREDENTIAL);
    next(e);
  }
};
