# Restaurant Search API

A RESTful API for searching restaurants and dishes built with Node.js, Express.js, Prisma ORM v6, MySQL, and Zod validation.

## Tech Stack
* TypeScript
* Node.js
* Express.js
* Prisma ORM v6
* MySQL
* Zod (validation)

## Environment Variables

A `.env.sample` file is provided. Create a `.env` file in the root and configure the following:

```env
PORT=3000
DATABASE_URL="mysql://user:password@localhost:3306/restaurant_db"
```

## Setup Instructions

```bash
npm install
```

```bash
npx prisma generate
```

```bash
npx prisma migrate dev --name init
```



## Seeding the Database

Run the seed script using:

```bash
npm run seed
```

## Running the Server

```bash
npm run dev
```

Server will start at:

```
http://localhost:3000
```

## API Endpoints

### Home Route

```http
GET /api/v1/restaurants
```

#### Sample Response

```json
{
  "statusCode": 200,
  "message": "Restaurants found",
  "success": true,
  "data": {
    "Restaurants": [
      {
        "id": "cmizr8b180000iuc8azrk6nwi",
        "name": "Burger Town",
        "city": "Mumbai",
        "menuItems": [
          {
            "dishName": "Burger",
            "price": "594.78",
            "isAvailable": true,
            "_count": {
              "orders": 6
            }
          }
        ]
      }
    ]
  }
}
```

### Search Dishes API

```http
GET /api/v1/search/dishes?name=pizza&minPrice=100&maxPrice=1000
```

#### Sample Response

```json
{
  "statusCode": 200,
  "message": "Dishes found",
  "success": true,
  "data": {
    "Restaurants": [
      {
        "restaurantId": "cmizr8b180000iuc8azrk6nwi",
        "restaurantName": "Burger Town",
        "city": "Mumbai",
        "dishName": "Pizza",
        "dishPrice": "40.02",
        "isAvailable": true,
        "orderCount": 7
      },
      {
        "restaurantId": "cmizr8b19000biuc85eapzsy8",
        "restaurantName": "The Spice Route",
        "city": "Bangalore",
        "dishName": "Pizza",
        "dishPrice": "866.44",
        "isAvailable": true,
        "orderCount": 7
      }
    ]
  }
}
```

## Notes

* Run `npm run seed` to populate the database
* Use the `.env.sample` file for environment variable reference

## License

MIT
