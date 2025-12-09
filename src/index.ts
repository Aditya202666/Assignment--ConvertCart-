import "dotenv/config";
import express, { type Application } from "express";
import helmet from "helmet";
import cors from "cors";

import { ALLOWED_ORIGIN } from "./lib/constants.js";
import { prisma } from "./lib/prima.js";

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


app.get("/", async (req, res) => {

  const restaurants = await prisma.restaurant.findMany({
    include: {
      menuItems: true,
    },
  });

  res.json({
    message: "hello world",
    data: restaurants,
  });
});

app.listen(port, () => {
  console.log("server is running");
});
