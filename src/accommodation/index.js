import express from "express";
import accommodationSchema from "./accommodationSchema.js";

import accommodation from "./accommodationSchema.js";

const accommodationRouter = express.Router();

accommodationRouter.get("/", async (req, res, next) => {
  try {
    const getAccommodations = await accommodationSchema.find();
    // .populate("host");

    res.send(getAccommodations);
  } catch (error) {
    console.log(error);
  }
});

accommodationRouter.get("/:accMoId", async (req, res, next) => {
  try {
    const getAccommodations = await accommodationSchema.findById(
      req.params.accMoId
    );

    if (getAccommodations) {
      res.send(getAccommodations);
    } else {
      next(404, "Accommodation not found!");
    }
  } catch (error) {
    console.log(error);
  }
});

accommodationRouter.post("/", async (req, res, next) => {
  try {
    const createdAccommodation = await accommodationSchema.create(req.body);

    res.send(createdAccommodation);
  } catch (error) {
    console.log(error);
  }
});
export default accommodationRouter;
