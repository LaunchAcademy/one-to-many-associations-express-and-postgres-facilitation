import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const EnchantedForestsList = (props) => {
  const [enchantedForests, setEnchantedForests] = useState([])

  const getEnchantedForests = async () => {
    try {
      const response = await fetch("/api/v1/enchanted-forests")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const responseBody = await response.json()
      setEnchantedForests(responseBody.enchantedForests)
    } catch (error) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getEnchantedForests()
  }, [])

  const forestsList = enchantedForests.map((forest) => {
    return (
      <li key={forest.id}>
        <Link to={`/enchanted-forests/${forest.id}`}>{forest.name}</Link>
      </li>
    )
  })
  return (
    <>
      <h1>Enchanted Forests</h1>
      <ul>{forestsList}</ul>
    </>
  )
}

export default EnchantedForestsList