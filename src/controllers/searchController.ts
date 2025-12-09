import { prisma } from "../lib/prima.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { dishesSearchValidator } from "../validators/searchValidator.js";

const searchDishesByName = asyncHandler(async (req, res) => {
  const queryData = req.query;

  const parsedData = dishesSearchValidator.parse(queryData);

  const { name: dishName, minPrice, maxPrice } = parsedData;

  const dishes = await prisma.menuItem.findMany({
    where: {
      AND: [
        { dishName: { contains: dishName as string }, isAvailable: true },
        minPrice ? { price: { gte: Number(minPrice) } } : {},
        maxPrice ? { price: { lte: Number(maxPrice) } } : {},
      ],
    },

    select: {
      dishName: true,
      price: true,
      isAvailable: true,
      orderCount: true,
      restaurant: {
        select: {
          id: true,
          name: true,
          city: true,
        },
      },
    },

    orderBy: {
      orderCount: "desc",
    },

    take: 10,
  });

  if (dishes.length === 0) {
    res.json(
      new ApiResponse(404, "No dishes found", {
        message: "No dishes found!, try other dish name or price range",
      })
    );
  }

  return res.status(200).json(dishes);
});

export { searchDishesByName };
