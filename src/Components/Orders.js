import React, { Component } from 'react';
import orders from "../Data/orders";
import items from "../Data/items";
import Order from "./Order";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";

class Orders extends Component {

    constructor () {
        super()
        this.state = {
            orders : orders ? orders : null,
            items : items ? items : null,
            isStandalone : false,

        }
    }

    render() {

        const columns = ['date','id','items'];

        const {orders,items,title,fromStore} = this.props

        let ordersValide;
        let itemsValide;
        let titleValide;

        let ordersNumber;


        if( orders == undefined || items ==undefined){
            ordersValide = this.state.orders;
            itemsValide = this.state.items;
            titleValide = "Toutes les commandes";
            ordersNumber = 200;
        }else{
            ordersValide = orders;
            itemsValide = items;
            titleValide = title
            ordersNumber = 10;

        }
        let rows;
        if(ordersValide!= undefined && ordersValide != null){
            ordersValide.orders.sort(function(a,b){
                let c = new Date(a.date);
                let d = new Date(b.date);
                return c-d;
            })
            ordersValide.orders.reverse();

            rows = ordersValide.orders.slice(0,ordersNumber).map((order) => {
                return <Order
                    key={order.id}
                    order={order}
                    items={itemsValide}
                    listOfColumns={columns}
                />
            })
        }
        return (
            <div className={"container"}>
                        <h1 className={"titleStyle"}> {titleValide} </h1>
                    <div className={"table-wrapper-2"}>
                        <table className="table table-bordered table-responsive-md">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">ID</th>
                                <th scope="col">Liste d'objets</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rows}
                            </tbody>
                        </table>
                    </div>
                {!fromStore &&
                <Link to={`/`} ><Button className={"marginright p-3 col-md-2 margintop bg-primary border-0 rounded float-left"}>Retour</Button></Link>
                }
            </div>
        );
    }
}

export default Orders;
