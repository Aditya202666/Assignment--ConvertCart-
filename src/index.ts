import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import express, { type Application } from "express";

import { ALLOWED_ORIGIN, PORT } from "./utils/constants.js";

import routes from "./routes/index.js";
import globalRateLimiter from "./middlewares/rateLimiter.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";

const app: Application = express();

// * middlewares
app.use(
  cors({
    origin: ALLOWED_ORIGIN,
  })
);
app.use(helmet());
app.use(globalRateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use(routes);

// global error handler
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log("server is running");
});
