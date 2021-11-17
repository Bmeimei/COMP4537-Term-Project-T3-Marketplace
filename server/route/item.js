import express from "express";
import { addItem, deleteItem, getItemById, getValidItem } from "../controller/item.js";
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

// Delete Item
ItemRouter.delete("/:id", auth, deleteItem);

export default ItemRouter;
