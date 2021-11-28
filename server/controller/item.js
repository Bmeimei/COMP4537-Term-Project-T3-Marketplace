import { Category, Item } from "../model/index.js";
import { BAD_REQUEST, INVALID_CREDENTIAL, NOT_FOUND, OK } from "../statusCode.js";
import dotenv from "dotenv";

dotenv.config();

const getItemByCategoryName = async (category, req, res, next) => {
  try {
    const existCategory = await Category.findOne({ name: category });
    if (!existCategory) {
      res.status(NOT_FOUND);
      next(new Error(`Category '${category}' not exist!`));
      return;
    }
    const items = await Item.find({
      category: existCategory._id,
      isValid: true
    })
      .populate("category", {
        name: 1
      })
      .exec();
    res.status(OK).send({
      message: "Success",
      items
    });
    next();
  } catch (e) {
    next(e);
  }
};

export const getValidItem = async (req, res, next) => {
  const { category } = req.query;

  if (category) {
    await getItemByCategoryName(category, req, res, next);
    return;
  }
  try {
    const items = await Item.find({ isValid: true }).exec();
    res.status(OK).send({
      message: "Success",
      items
    });
    next();
  } catch (e) {
    next(e);
  }
};

export const getItemById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id)
      .populate("category", {
        name: 1
      })
      .populate("user", {
        username: 1,
        email: 1
      })
      .exec();
    if (!item) {
      res.status(NOT_FOUND);
      next(new Error(`Item with id '${id}' Not Found!`));
      return;
    }
    res.send({
      message: "Success",
      item
    });
    next();
  } catch (e) {
    next(e);
  }
};

export const addItem = async (req, res, next) => {
  const userId = req.userId;
  try {
    const { name, price, description, category, image } = req.body;
    const existCategory = await Category.findOne({ name: category });
    if (!existCategory) {
      res.status(BAD_REQUEST);
      next(new Error(`Category '${category} is invalid!'`));
      return;
    }
    const item = await Item.create({
      name,
      price,
      description,
      image,
      category: existCategory._id,
      user: userId
    });
    res.send({
      message: "Success",
      item
    });
    next();
  } catch (e) {
    next(e);
  }
};

export const editItem = async (req, res, next) => {
  const userId = req.userId;
  const { id } = req.params;
  try {
    const { name, price, description, category, image } = req.body;
    const item = await Item.findById(id);
    const originUserId = item.user.toString();
    if (userId !== originUserId) {
      res.status(INVALID_CREDENTIAL);
      next(new Error("You have no right to edit this item"));
      return;
    }

    const existCategory = await Category.findOne({ name: category });
    if (!existCategory) {
      res.status(BAD_REQUEST);
      next(new Error(`Category '${category} is invalid!'`));
      return;
    }
    await Item.findByIdAndUpdate(id, {
      name,
      price,
      description,
      image,
      category: existCategory._id
    }).exec();
    res.status(200).send({
      message: "Success"
    });
    next();
  } catch (e) {
    next(e);
  }
};

export const displayOrHideItem = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const { isValid } = req.body;

    if (isValid === null || isValid === undefined) {
      res.status(400);
      next(new Error("Missing isValid field"));
      return;
    }

    const item = await Item.findById(id);
    const originUserId = item.user.toString();
    if (userId !== originUserId) {
      res.status(INVALID_CREDENTIAL);
      next(new Error("You have no right to edit this item"));
      return;
    }
    await Item.findByIdAndUpdate(id, {
      isValid
    });
    res.status(200).send({
      message: "Success"
    });
    next();
  } catch (e) {
    next(e);
  }
};

export const deleteItem = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const item = await Item.findById(id);
    const originUserId = item.user.toString();
    console.log(originUserId);
    console.log(userId);
    if (userId !== originUserId) {
      res.status(INVALID_CREDENTIAL);
      next(new Error("User Id doesn't match the Owner Id"));
      return;
    }
    await Item.findByIdAndDelete(id);
    res.send({
      message: "Success"
    });
    next();
  } catch (e) {
    next(e);
  }
};
