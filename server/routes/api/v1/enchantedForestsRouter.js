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
    // console.log("BEFORE ASSOCIATIONS")
    // console.log(enchantedForest)
    enchantedForest.unicorns = await enchantedForest.unicorns()
    // console.log("AFTER ASSOCIATIONS")
    // console.log(enchantedForest)
    
    res.status(200).json({ enchantedForest: enchantedForest })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

enchantedForestsRouter.post("/", async (req, res) => {
  try {
    const newEnchantedForest = new EnchantedForest(req.body)
    // console.log(newEnchantedForest)
    
    if (await newEnchantedForest.save()) {
      // console.log(newEnchantedForest)
      res.status(201).json({ enchantedForest: newEnchantedForest })
    } else {
      // console.log(newEnchantedForest)
      res.status(422).json({ errors: newEnchantedForest.errors })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

export default enchantedForestsRouter
