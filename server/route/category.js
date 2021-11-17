import express from "express";
import { addCategory, getAllCategory } from "../controller/category.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategory);
categoryRouter.post("/", addCategory);

export default categoryRouter;
