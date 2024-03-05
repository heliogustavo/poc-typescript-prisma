import { Router } from "express"
import { addMiaudelo, getMiaudelosList } from "../controllers/wishControllers.js"

const pedidosRouter = Router()

pedidosRouter.post("/add-pedidos", addWish)
pedidosRouter.get("/lista-de-pedidos", getWishList) 

export default pedidosRouter