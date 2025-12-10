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
        { price: { gte: Number(minPrice) } },
        { price: { lte: Number(maxPrice) } },
      ],
    },

    select: {
      dishName: true,
      price: true,
      isAvailable: true,
      restaurant: {
        select: {
          id: true,
          name: true,
          city: true,
        },
      },
      _count: {
        select: {
          orders: true,
        },
      },
    },

    orderBy: {
      orders: {
        _count: "desc",
      },
    },

    take: 10,
  });

  if (dishes.length === 0) {
    return res.json(
      new ApiResponse(
        200,
        "No dishes found!, try other dish name or price range",
        {}
      )
    );
  }

  const filteredData = dishes.map((dish) => {
    return {
      restaurantId: dish.restaurant.id,
      restaurantName: dish.restaurant.name,
      city: dish.restaurant.city,
      dishName: dish.dishName,
      dishPrice: dish.price,
      isAvailable: dish.isAvailable,
      orderCount: dish._count.orders,
    };
  });

  return res.status(200).json(
    new ApiResponse(200, "Dishes found", {
      Restaurants: filteredData,
    })
  );
});

export { searchDishesByName };
