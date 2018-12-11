import React, { Component } from 'react';
import orders from '../Data/orders.json'
import {getWingOrders} from "../API/WingAPI";
import Order from "./Order";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import Orders from "./Orders";


class Store extends Component {
    constructor () {
        super()
        this.state = {
            orders : orders ? orders : null,

        }
    }

    componentDidMount() {
        getWingOrders()
    }


    render() {

        const {orders,items} = this.props

        return(
            <div className={"container "}>

                <Orders title = {"Les dernières commandes"}orders = {this.props.orders} items = {this.props.items} fromStore = {true}/>

                <Link to={`/orders`} ><Button className={"marginright p-3 col-md-3 margintop bg-success border-0 rounded float-right"}>Toutes les commandes</Button></Link>
                <Link to={`/parcels`} ><Button className={"p-3 col-md-3 float-right margintop bg-info border-0 rounded marginright"}>Préparer les palettes</Button></Link>



            </div>
        )
    }
}

export default Store;
