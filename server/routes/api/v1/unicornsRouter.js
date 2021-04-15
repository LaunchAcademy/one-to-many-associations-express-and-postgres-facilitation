import express from "express"

import Unicorn from "../../../models/Unicorn.js"

const unicornsRouter = new express.Router()

unicornsRouter.get("/", async (req, res) => {
  try {
    const unicorns = await Unicorn.findAll()
    res.status(200).json({ unicorns: unicorns })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

unicornsRouter.get("/:id", async (req, res) => {
  try {
    const unicorn = await Unicorn.findById(req.params.id)
    unicorn.enchantedForest = await unicorn.enchantedForest()
    // console.log("unicorn")
    // console.log(unicorn)
    
    res.status(200).json({ unicorn: unicorn })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

unicornsRouter.post("/", async (req, res) => {
  try {
    const newUnicorn = new Unicorn(req.body)
    if (await newUnicorn.save()) {
      res.status(201).json({ unicorn: newUnicorn })
    } else {
      res.status(422).json({ errors: newUnicorn.errors })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

export default unicornsRouter
