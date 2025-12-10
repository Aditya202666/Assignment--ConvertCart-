import { prisma } from "../lib/prima.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllDetails = asyncHandler(async (req, res) => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      city: true,
      menuItems: {
        select: {
          dishName: true,
          price: true,
          isAvailable: true,
          _count: {
            select: {
              orders: true,
            },
          },
        },
      },
    },
  });

  return res.json(
    new ApiResponse(200, "Restaurants found", {
      Restaurants: restaurants,

  }))
});


export { getAllDetails };