import { Router} from "express"

import searchRoutes from "./searchRoute.js"


const router = Router()


router.use("/api/v1/search", searchRoutes)



export default router 