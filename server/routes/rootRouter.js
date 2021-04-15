import express from "express"

import clientRouter from "./clientRouter.js"
import enchantedForestsRouter from "./api/v1/enchantedForestsRouter.js"
import unicornsRouter from "./api/v1/unicornsRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/enchanted-forests", enchantedForestsRouter)
rootRouter.use("/api/v1/unicorns", unicornsRouter)
rootRouter.use("/", clientRouter)

export default rootRouter
