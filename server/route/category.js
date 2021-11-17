import express from "express";
import { addCategory, getAllCategory } from "../controller/category.js";

const categoryRouter = express.Router();

categoryRouter.use((req, res, next) => {
  req.endpoint = "/category";
  next();
});

categoryRouter.get("/", getAllCategory);
categoryRouter.post("/", addCategory);

export default categoryRouter;
