import { prisma } from "../lib/prima.js";
import 'dotenv/config'

async function main() {

  // Create multiple restaurants
  const restaurantsData = [
    { name: "Burger Town", city: "Mumbai" },
    { name: "Spice Hub", city: "Delhi" },
    { name: "Pizza Planet", city: "Bangalore" },
  ];

  const createdRestaurants = await prisma.restaurant.createMany({
    data: restaurantsData,
  });

  // Prepare menu items (same items for all restaurants)
  const menuTemplates = [
    { name: "Biryani", price: 100 },
    { name: "Pizza", price: 200 },
    { name: "Burger", price: 300 },
  ];

  // Assign menu items to each restaurant with random orderCount
  const menuItemsData = [];
  
  // Fetch restaurant IDs (since createMany does not return created records)
  const restaurants = await prisma.restaurant.findMany();

  for (const restaurant of restaurants) {
    for (const menu of menuTemplates) {
      menuItemsData.push({
        dishName: menu.name,
        price: menu.price,
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

main()
  .catch((err) => console.error(err))