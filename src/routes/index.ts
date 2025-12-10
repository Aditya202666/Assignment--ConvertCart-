import { Router } from "express";

import searchRoutes from "./searchRoute.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getAllDetails } from "./homeRoute.js";

const router = Router();

router.use("/api/v1/search", searchRoutes);
router.get("/", getAllDetails); // default route (For assignment testing only,  fetch all details of all restaurants(heavy))

router.all(/.*/, (req, res) => { // not found route
  res.json(
    new ApiResponse(404, "Route not found", {
      message: "Route not found!",
      example: "/api/v1/search/dishes?name=pizza",
    })
  );
});

export default router;
