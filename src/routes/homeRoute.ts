import { prisma } from "../lib/prima.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllDetails = asyncHandler(async (req, res) => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
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

  res.json({
    message: "hello world",
    restaurants,
  });
});


export { getAllDetails };