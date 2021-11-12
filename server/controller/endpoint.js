import Endpoint from "../model/endpoint.js";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../statusCode.js";

const getRoute = (req) => {
  const route = req.route ? req.route.path : "";
  const baseUrl = req.baseUrl ? req.baseUrl : "";
  // if the req has the prefix endpoint like /admin
  if (req?.endpoint) {
    return route ? `${req.endpoint}${baseUrl === "/" ? "" : baseUrl}${route}` : "unknown route";
  }
  return route ? `${baseUrl === "/" ? "" : baseUrl}${route}` : "unknown route";
};

const updateEndpointOrCreateOne = async (endpoint, method) => {
  try {
    await Endpoint.findOneAndUpdate(
      { endpoint, method },
      {
        $inc: {
          requests: 1
        }
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    ).exec();
  } catch (e) {
    console.log(e);
  }
};

export const recordEndpoint = async (req, res, next) => {
  try {
    const method = req.method;
    const route = getRoute(req);
    if (route === "unknown route") {
      res.status(NOT_FOUND);
      next(new Error("Route Not Exist!"));
      return;
    }
    await updateEndpointOrCreateOne(route, method);
    next();
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR);
    console.log(e.message);
    next(e);
  }
};

export const getAllEndpoint = async (req, res, next) => {
  try {
    const result = await Endpoint.find();
    res.status(OK).send({ endpoints: result, message: "Success" });
    next();
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR);
    next(e);
  }
};
