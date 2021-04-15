import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const EnchantedForestShow = props => {
  const [enchantedForest, setEnchantedForest] = useState({ unicorns: [] })

  const getEnchantedForest = async () => {
    const id = props.match.params.id

    try {
      const response = await fetch(`/api/v1/enchanted-forests/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const fetchedData = await response.json()
      setEnchantedForest(fetchedData.enchantedForest)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getEnchantedForest()
  }, [])

  const enchantedForestUnicornsList = enchantedForest.unicorns.map(unicorn => {
    return(
      <li key={unicorn.id}>{unicorn.name}</li>
    )
  })

  return(
    <>
      <h5><Link to="/enchanted-forests">Back to All Enchanted Forests</Link></h5>
      <h1>{enchantedForest.name}</h1>
      <h2>Unicorns:</h2>
      <ul>{enchantedForestUnicornsList}</ul>
    </>
  )
}

export default EnchantedForestShow
