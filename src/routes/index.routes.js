import { Router } from "express"
import pedidosRouter from "./wishRoutes.js"

const router = Router()

router.use(pedidosRouter)

export default router