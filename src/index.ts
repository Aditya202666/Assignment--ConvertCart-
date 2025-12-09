import "dotenv/config";
import express, { type Application } from "express";
import helmet from "helmet";
import cors from "cors";

import { ALLOWED_ORIGIN } from "./lib/constants.js";
import { prisma } from "./lib/prima.js";
import routes from "./routes/index.js";
import ApiResponse from "./utils/ApiResponse.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.get("/", async (req, res) => {
  const restaurants = await prisma.restaurant.findMany({
    include: {
      menuItems: true,
    },
  });

  res.json({
    message: "hello world",
    restaurants,
  });
});


// * route not found
app.all(/.*/, (req, res) => {
  res.json(
    new ApiResponse(404, "Route not found", {
      message: "Route not found!",
      example: "/api/v1/search/dishes?name=pizza",
    })
  );
});


// * global error handler
app.use(errorHandlerMiddleware)

app.listen(port, () => {
  console.log("server is running");
});
