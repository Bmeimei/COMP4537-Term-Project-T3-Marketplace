import { Category, Item } from "../model/index.js";
import { ALREADY_EXIST, BAD_REQUEST, OK } from "../statusCode.js";

const getAllItemGroupByCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().lean().exec();
    const items = await Item.find({
      isValid: true
    })
      .lean()
      .exec();
    for (const category of categories) {
      category.items = [];
      const categoryId = category._id;
      for (const item of items) {
        if (item.category.equals(categoryId)) {
          category.items.push(item);
        }
      }
    }
    res.status(OK).send({
      message: "Success",
      categories
    });
    next();
  } catch (e) {
    next(e);
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    const { groupItems } = req.query;

    if (groupItems) {
      await getAllItemGroupByCategories(req, res, next);
      return;
    }

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
