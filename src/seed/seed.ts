import { OrderStatus } from "./../generated/enums.js";
import "dotenv/config";
import fs from "fs/promises";

import { prisma } from "../lib/prima.js";

async function seedDatabase() {
  //delete old data
  await prisma.menuItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.restaurant.deleteMany();

  console.log("Seeding database...");

  const restaurantsJsonData = JSON.parse(
    await fs.readFile("./src/seed/restaurants.json", "utf-8")
  );

  const menuItemsJsonData = JSON.parse(
    await fs.readFile("./src/seed/menuItems.json", "utf-8")
  );

  // Create multiple restaurants
  const createdRestaurants = await prisma.restaurant.createMany({
    data: restaurantsJsonData,
  });

  // Assign menu items to each restaurant with random orderCount
  const menuItemsData = [];

  // Fetch restaurant IDs (since createMany does not return created records)
  const restaurants = await prisma.restaurant.findMany();

  for (const restaurant of restaurants) {
    for (const menu of menuItemsJsonData) {
      menuItemsData.push({
        dishName: menu.name,
        price: Math.random() * 1000,
        // orderCount: Math.floor(Math.random() * 100), //* */ can be used for denormalization of orderCount (easier to query)
        restaurantId: restaurant.id, // link to restaurant
      });
    }
  }

  // Bulk insert menu items
  await prisma.menuItem.createMany({
    data: menuItemsData,
  });

  // get all the id of menuItems
  const menuItems = await prisma.menuItem.findMany({
    select: { id: true },
  });

  // get all the id of menuItems
  const filteredMenuItems = menuItems.map((item) => item.id);

  const ordersData = [];

  for (let i = 0; i < 1000; i++) {
    const menuItem =
      filteredMenuItems[Math.floor(Math.random() * filteredMenuItems.length)]!;
    ordersData.push({
      menuItemId: menuItem,
      status: OrderStatus.DELIVERED,
    });
  }

  await prisma.order.createMany({
    data: ordersData,
  });

  console.log("Seeding completed!");
}

seedDatabase().catch((err) => console.error(err));
