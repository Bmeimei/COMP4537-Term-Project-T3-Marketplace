import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// HTTP Status

// Fine
const OK = 200;

// Method Not Allowed (Not GET or POST method)
const METHOD_NOT_ALLOWED = 405;

// Word not in records
const NOT_FOUND = 404;

// Word already exist
const ALREADY_EXIST = 403;

// Miss Params like word or definition
const BAD_REQUEST = 400;

// Server get the problems
const INTERNAL_SERVER_ERROR = 500;

const app = express();
const PORT = process.env.PORT || 5050;
app.use(express.json());
app.use(
  cors({
    origin: "*"
  })
);

app.get("/", (req, res) => {
  res.status(OK).send({
    message: "Hey man!"
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
