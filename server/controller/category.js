import Category from "../model/category.js";
import { ALREADY_EXIST, BAD_REQUEST } from "../statusCode.js";

export const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find().exec();
    res.send({
      message: "Success",
      categories
    });
    next();
  } catch (e) {
    next(e);
  }
};

export const addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(BAD_REQUEST);
      next(new Error("name field is not exist!"));
      return;
    }
    const category = await Category.create({ name });
    res.send({
      message: "Success",
      category
    });
    next();
  } catch (e) {
    if (e?.code === 11000) {
      res.status(ALREADY_EXIST);
      next(new Error("Category already exists!"));
      return;
    }
    next(e);
  }
};
