import express from "express";
import { getAllEndpoint } from "../controller/endpoint.js";
import { adminAuth } from "../adminAuth.js";

const endpointRouter = express.Router();

endpointRouter.use((req, res, next) => {
  req.endpoint = "/endpoint";
  next();
});

endpointRouter.get("/", adminAuth, getAllEndpoint);

export default endpointRouter;
