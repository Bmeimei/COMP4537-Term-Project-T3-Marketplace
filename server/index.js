import express from "express";
import dotenv from "dotenv";
import { INTERNAL_SERVER_ERROR, OK } from "./statusCode.js";
import mongoose from "mongoose";
import { recordEndpoint } from "./controller/endpoint.js";
import {
  userRouter,
  adminRouter,
  itemRouter,
  endpointRouter,
  categoryRouter
} from "./route/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://marketplace.cacodehunter.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Authorization");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  next();
});

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => app.listen(PORT, () => console.log(`Listening On Port ${PORT}`)))
  .catch((e) => console.log(e));

/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== OK ? res.statusCode : INTERNAL_SERVER_ERROR;
  res.status(statusCode);
  res.send({
    message: err.message
  });
  next();
};

app.get("/", (req, res, next) => {
  res.status(OK).send({
    message: "Hey man!"
  });
  next();
});

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/item", itemRouter);
app.use("/category", categoryRouter);

app.use("/endpoint", endpointRouter);
app.use(recordEndpoint);
app.use(errorHandler);
