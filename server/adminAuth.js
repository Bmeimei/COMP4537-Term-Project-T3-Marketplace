import jwt from "jsonwebtoken";
import { INVALID_CREDENTIAL } from "./statusCode.js";
import dotenv from "dotenv";

dotenv.config();

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization.split(" ")[1];
    jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET);
    next();
  } catch (e) {
    res.status(INVALID_CREDENTIAL);
    next(e);
  }
};
