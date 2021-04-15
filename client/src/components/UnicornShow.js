import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const UnicornShow = props => {
  const [unicorn, setUnicorn] = useState({ enchantedForest: {} })

  const getUnicorn = async () => {
    const id = props.match.params.id

    try {
      const response = await fetch(`/api/v1/unicorns/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const fetchedData = await response.json()
      console.log(fetchedData)
      setUnicorn(fetchedData.unicorn)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getUnicorn()
  }, [])

  return(
    <div className="callout primary">
      <h5><Link to="/unicorns">Back to All Unicorns</Link></h5>
      <h1>{unicorn.name}</h1>
      <h2>Last spotted in this Enchanted Forest:</h2>
      <i>{unicorn.enchantedForest.name}</i>
    </div>
  )
}

export default UnicornShow
