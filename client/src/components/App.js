import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import EnchantedForestShow from "./EnchantedForestShow"
import EnchantedForestsList from "./EnchantedForestsList"

import "../assets/main.css"

const App = props => {
  return(
    <BrowserRouter>
      <Route exact path="/enchanted-forests" component={EnchantedForestsList} />
      <Route exact path="/enchanted-forests/:id" component={EnchantedForestShow} />
    </BrowserRouter>
  )
}

export default hot(App)
