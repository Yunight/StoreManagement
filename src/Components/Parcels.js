import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import orders from "../Data/orders";
import items from "../Data/items";
import Parcel from "./Parcel";
import {
    calculateParcelPrice,
    createParcels,
    getOrderTotalWeight,
    getProductNameWithWeight,
    mergeIdenticalItem,
} from "../Utils/UtilitiesFunction";

class Parcels extends Component {

    constructor () {
        super()
        this.state = {
            orders : orders ? orders : null,
            items : items ? items : null,
            trackingID : {}
        }
    }




    render() {

        const {orders, items, columns} = this.props

        let ordersValide,columnsParcelsValide;
        let palette_number = 1;

        if( orders === undefined || items === undefined){
            ordersValide = this.state.orders;

            columnsParcelsValide = ['order_id','items','weight',"status","tracking_id","palette_number","price"];
        }else{
            ordersValide = orders;

            columnsParcelsValide = columns;

        }

        let rows;
        const Parcels=[];
        if(ordersValide!== undefined && ordersValide !== null){
            let order_id
        ordersValide.orders.sort(function(a,b){
            let c = new Date(a.date);
            let d = new Date(b.date);
            return c-d;
        })

        ordersValide.orders.reverse();

        let preparedPacels = [];
        ordersValide.orders.map(order =>{
            order_id = order.id;
            let itemsWithWeight =  mergeIdenticalItem(getProductNameWithWeight(order.items,items))

            let totalWeight = getOrderTotalWeight(itemsWithWeight);
            let nbOfParcelsNeeded = Math.ceil(totalWeight/30);
            let createdParcels =  createParcels(nbOfParcelsNeeded,itemsWithWeight,order.id);

            createdParcels.map(singleParcel =>{
                preparedPacels.push(singleParcel)
            })
        })

        preparedPacels.map(parcel =>{

            parcel.price = calculateParcelPrice(parcel.weight);
            parcel.palette_number = palette_number;
            palette_number++
        })


        rows = preparedPacels.map((order) => {
            return <Parcel
                key={order.palette_number}
                order={order}
                listOfColumns={columnsParcelsValide}
            />
        })
        }

        return (
            <div className={"container"}>
                <h1 className={"titleStyle"}>Palettes</h1>

                <div className={"table-wrapper-2"}>
                    <table className="table table-bordered table-responsive-md">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID Commande</th>
                            <th scope="col">Objets</th>
                            <th scope="col">Poids(Kg)</th>
                            <th scope="col">Etat</th>
                            <th scope="col">Suivi</th>
                            <th scope="col">N°Palette</th>
                            <th scope="col">Prix(€)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                </div>

                <Link to={`/`} ><Button className={"marginright p-3 col-md-2 margintop bg-primary border-0 rounded float-left"}>Retour</Button></Link>
            </div>
        );
    }
}

export default Parcels;
