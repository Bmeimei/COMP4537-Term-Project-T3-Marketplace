import express from "express";

const ItemRouter = express.Router();

ItemRouter.use((req, res, next) => {
  req.endpoint = "/item";
  next();
});

ItemRouter.get("/", (req, res, next) => {
  res.send({ message: "I am Item man!" });
  next();
});

export default ItemRouter;
