
import { Router } from "express";

import { getAllDetails } from "../controllers/homeController.js";

const router = Router();

router.get("/", getAllDetails); // default route (For assignment testing only,  fetch all details of all restaurants(heavy))


export default router;
