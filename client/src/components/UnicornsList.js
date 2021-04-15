import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const UnicornsList = (props) => {
  const [unicorns, setUnicorns] = useState([])

  const getUnicorns = async () => {
    try {
      const response = await fetch("/api/v1/unicorns")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const responseBody = await response.json()
      setUnicorns(responseBody.unicorns)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getUnicorns()
  }, [])

  const unicornsList = unicorns.map((unicorn) => {
    return (
      <li key={unicorn.id}>
        <Link to={`/unicorns/${unicorn.id}`}>{unicorn.name}</Link>
      </li>
    )
  })

  return (
    <div className="callout secondary">
      <h1>Unicorns</h1>
      <ul className="callout primary">
        {unicornsList}
      </ul>
    </div>
  )
}

export default UnicornsList