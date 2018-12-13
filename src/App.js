import React, {Component} from 'react';
import './App.css';
import items from './Data/items.json'
import orders from './Data/orders.json'
import Orders from "./Components/Orders";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Parcels from "./Components/Parcels";
import Store from "./Components/Store";

const columnsOrders = ['date','id','items'];
const columnsParcelsValide = ['order_id','items','weight',"status","tracking_id","palette_number","price"];

class App extends Component {
    constructor () {
        super()
        this.state = {
            items: items,
            orders : orders,
        }
    }
  render() {

      const {orders,items} = this.state

      return <BrowserRouter>
          <Switch>
              <Route exact path="/">
                  <div className="App">
                      <Store orders = {orders} items = {items} columns={columnsOrders}/>
                  </div>
              </Route>

              <Route exact path="/parcels">
                  <Parcels orders = {orders} items = {items} columns={columnsParcelsValide} />
              </Route>

              <Route exact path="/orders">
                  <Orders/>
              </Route>

          </Switch>
      </BrowserRouter>

  }
}

export default App;
