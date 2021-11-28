import express from "express";
import {
  addItem,
  deleteItem,
  displayOrHideItem,
  editItem,
  getItemById,
  getValidItem
} from "../controller/item.js";
import { auth } from "../auth.js";

const ItemRouter = express.Router();

ItemRouter.use((req, res, next) => {
  req.endpoint = "/item";
  next();
});

// Get all valid item
ItemRouter.get("/", getValidItem);
ItemRouter.get("/:id", getItemById);

// Add Item
ItemRouter.post("/", auth, addItem);

// Edit Item
ItemRouter.put("/:id", auth, editItem);

// Hide Item or Display Item
ItemRouter.patch("/:id", auth, displayOrHideItem);

// Delete Item
ItemRouter.delete("/:id", auth, deleteItem);

export default ItemRouter;
