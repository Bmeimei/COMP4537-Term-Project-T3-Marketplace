import express from "express";
import { getAllEndpoint } from "../controller/endpoint.js";
import { adminAuth } from "../auth.js";

const endpointRouter = express.Router();

endpointRouter.use((req, res, next) => {
  req.endpoint = "/endpoint";
  next();
});

endpointRouter.get("/", adminAuth, getAllEndpoint);

export default endpointRouter;
