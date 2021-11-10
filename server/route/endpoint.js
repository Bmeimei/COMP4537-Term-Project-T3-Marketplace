import express from "express";
import { getAllEndpoint } from "../controller/endpoint.js";

const endpointRouter = express.Router();

endpointRouter.use((req, res, next) => {
  req.endpoint = "/endpoint";
  next();
});

endpointRouter.get("/", getAllEndpoint);

export default endpointRouter;
