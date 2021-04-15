import React, { useState } from "react"
import { Redirect } from "react-router-dom"

import ErrorList from "./ErrorList"

const EnchantedForestForm = (props) => {
  const [shouldRedirect, setShouldRedirect] = useState({
    status: false,
    newEnchantedForestId: null
  })
  const [errors, setErrors] = useState({})
  const [newEnchantedForest, setNewEnchantedForest] = useState({
    name: ""
  })

  const handleInputChange = (event) => {
    setNewEnchantedForest({
      ...newEnchantedForest,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    try {
      const response = await fetch("/api/v1/enchanted-forests", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newEnchantedForest)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const responseBody = await response.json()
          // return setErrors(responseBody.errors)
          setErrors(responseBody.errors)
        }
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      if (responseBody.enchantedForest) {
        console.log("Success!")
        setErrors({})
        setShouldRedirect({
          status: true,
          newEnchantedForestId: responseBody.enchantedForest.id
        })
      }
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  if (shouldRedirect.status) {
    return <Redirect to={`/enchanted-forests/${shouldRedirect.newEnchantedForestId}`} />
  }

  return (
    <div className="callout">
      <h1>New Enchanted Forest</h1>
      
      <ErrorList errors={errors} />

      <form onSubmit={handleSubmit} className="callout primary">
        <label htmlFor="name">Name:
          <input
            id="name"
            type="name"
            name="name"
            value={newEnchantedForest.name}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <input type="submit" value="Add" className="button" />
      </form>
    </div>
  )
}

export default EnchantedForestForm