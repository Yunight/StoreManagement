import React, {Component} from 'react';
import orders from '../Data/orders.json'
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

    render() {

        const {orders,items,columns} = this.props

        return(
            <div className={"container "}>
                <Orders title = {"Les dernières commandes (10)"}orders = {orders} items = {items} fromStore = {true} columns = {columns}/>
                <Button href={`mailto:${'benchi.chen.bc@gmail.com?subject=Recrutement : Développeur Web Benchi C&body=Début du message ...'}`} className={"marginleft p-3 col-md-3 margintop bg-primary border-0 rounded float-left"}>Me recruter</Button>
                <Link to={`/orders`} ><Button className={"marginright p-3 col-md-3 margintop bg-success border-0 rounded float-right"}>Toutes les commandes</Button></Link>
                <Link to={`/parcels`} ><Button className={"p-3 col-md-3 float-right margintop bg-info border-0 rounded marginright"}>Préparer les palettes</Button></Link>
            </div>
        )
    }
}

export default Store;
