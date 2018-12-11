import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import items from './Data/items.json'
import orders from './Data/orders.json'

import Orders from "./Components/Orders";
import {getWingItems, getWingOrders} from "./API/WingAPI";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Parcels from "./Components/Parcels";
import Store from "./Components/Store";
import Order from "./Components/Order";

class App extends Component {
    constructor () {
        super()
        this.state = {
            items: items,
            orders : orders,
            parcel : [],
        }
    }

    componentDidMount(){
       // getWingItems()
        this.getRandomTracket()
    }

    componentWillMount() {
        //getWingItems()
        //getWingOrders()
    }

    getRandomTracket(){
        axios.get("https://helloacm.com/api/random/?n=15")
            .then(response => this.setState({parcel: response.data}))
    }

  render() {

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

                      <Store orders = {this.state.orders} items = {this.state.items} />
                  </div>
              </Route>

              <Route exact path="/parcels">
                  <Parcels/>
              </Route>

              <Route exact path="/orders">
                  <Orders/>
              </Route>

          </Switch>
      </BrowserRouter>

  }
}

export default App;
