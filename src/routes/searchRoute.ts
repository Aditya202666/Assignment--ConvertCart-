import { Router} from "express"
import { searchDishesByName } from "../controllers/searchController.js"

const router = Router()

router.get("/dishes", searchDishesByName)


export default router 