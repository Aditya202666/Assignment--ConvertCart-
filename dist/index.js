import "dotenv/config";
import express, {} from "express";
import helmet from "helmet";
import cors from "cors";
import { ALLOWED_ORIGIN } from "./config/constants.config.js";
const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
    origin: ALLOWED_ORIGIN,
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.json({
        name: "Aditya",
        work: "Coding",
    });
});
app.listen(port, () => {
    console.log("server is running");
});
//# sourceMappingURL=index.js.map