import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import EnchantedForestsList from "./EnchantedForestsList"
import EnchantedForestForm from "./EnchantedForestForm"
import EnchantedForestShow from "./EnchantedForestShow"
import UnicornsList from "./UnicornsList"
import UnicornShow from "./UnicornShow"

import "../assets/main.css"

const App = props => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/enchanted-forests" component={EnchantedForestsList} />
        <Route exact path="/enchanted-forests/new" component={EnchantedForestForm} />
        <Route exact path="/enchanted-forests/:id" component={EnchantedForestShow} /> 
        <Route exact path="/unicorns" component={UnicornsList} />
        <Route exact path="/unicorns/:id" component={UnicornShow} />
      </Switch>
    </BrowserRouter>
  )
}

export default hot(App)
