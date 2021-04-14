import express from "express"

import EnchantedForest from "../../../models/EnchantedForest.js"

const enchantedForestsRouter = new express.Router()

enchantedForestsRouter.get("/", async (req, res) => {
  try {
    const enchantedForests = await EnchantedForest.findAll()
    res.status(200).json({ enchantedForests: enchantedForests })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

enchantedForestsRouter.get("/:id", async (req, res) => {
  try {
    const enchantedForest = await EnchantedForest.findById(req.params.id)
    enchantedForest.unicorns = await enchantedForest.unicorns()
    
    res.status(200).json({ enchantedForest: enchantedForest })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default enchantedForestsRouter
