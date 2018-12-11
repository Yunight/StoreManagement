import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import items from './Data/items.json'
import orders from './Data/orders.json'
import Orders from "./Components/Orders";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Parcels from "./Components/Parcels";
import Store from "./Components/Store";

const columnsOrders = ['date','id','items'];

class App extends Component {
    constructor () {
        super()
        this.state = {
            items: items,
            orders : orders,
        }
    }

    getRandomTracket(){
        axios.get("https://helloacm.com/api/random/?n=15")
            .then(response => this.setState({parcel: response.data}))
    }

  render() {

      const {orders,items} = this.state
     /* if (typeof this.state.parcel !== 'undefined' && this.state.parcel.length > 0){

          console.log(this.state.parcel)
                       /* <Route exact
                     path="/country/:countryKey"
                     component={CountryDetailRouteComponent}
              />
      }*/

      return <BrowserRouter>
          <Switch>
              <Route exact path="/">
                  <div className="App">
                      <Store orders = {orders} items = {items} columns={columnsOrders}/>
                  </div>
              </Route>

              <Route exact path="/parcels">
                  <Parcels orders = {orders} items = {items} columns={columnsOrders} />
              </Route>

              <Route exact path="/orders">
                  <Orders/>
              </Route>

          </Switch>
      </BrowserRouter>

  }
}

export default App;
