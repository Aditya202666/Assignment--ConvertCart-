import 'dotenv/config'
import fs from 'fs/promises'

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
        orderCount: Math.floor(Math.random() * 100), // random orders
        restaurantId: restaurant.id, // link to restaurant
      });
    }
  }

  // Bulk insert menu items
  await prisma.menuItem.createMany({
    data: menuItemsData,
  });

  console.log("Seeding completed!");
}

seedDatabase()
  .catch((err) => console.error(err))