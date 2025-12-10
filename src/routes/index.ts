import { Router } from "express";

import searchRoutes from "./searchRoute.js";
import homeRoutes from "./homeRoute.js";
import ApiResponse from "../utils/ApiResponse.js";

const router = Router();

router.use("/api/v1/search", searchRoutes);
router.use("/api/v1/restaurants", homeRoutes); 

// not found route
router.all(/.*/, (req, res) => { 
  res.json(
    new ApiResponse(404, "Route not found", {
      message: "Route not found!",
      example: "/api/v1/search/dishes?name=pizza&minPrice=10&maxPrice=2000",
    })
  );
});

export default router;
