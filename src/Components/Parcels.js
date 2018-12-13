import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import Order from "./Order";
import orders from "../Data/orders";
import items from "../Data/items";
import Parcel from "./Parcel";
import Immutable from "seamless-immutable";
import {
    availableParcel,
    createParcels, generateTrackingID,
    getOrderTotalWeight,
    getProductName,
    getProductNameWithWeight,
    mergeIdenticalItem, parcelIsFull,
    parcelIsNotFull, parcelIsOverweight
} from "../Utils/UtilitiesFunction";

class Parcels extends Component {

    constructor () {
        super()
        this.state = {
            orders : orders ? orders : null,
            items : items ? items : null,
            isStandalone : false,
            isSameParcel : true,
        }
    }

    render() {

        const {orders, items, columns} = this.props

        let ordersValide, itemsValide,columnsParcelsValide, ordersNumber;
        let palette_number = 0;

        if( orders === undefined || items === undefined){
            ordersValide = this.state.orders;
            itemsValide = this.state.items;
            ordersNumber = 200;
            columnsParcelsValide = ['order_id','items','weight',"status","tracking_id","palette_number"];
        }else{
            ordersValide = orders;
            itemsValide = items;
            ordersNumber = 10;
            columnsParcelsValide = columns;

        }

        let rows;
        const Parcels=[];
        let parcelUnity  = {
            'order_id' : 0,
            'items': [],
            'weight':null,
            "status":null,
            "tracking_id":null,
            "palette_number" :null,
        }


        if(ordersValide!== undefined && ordersValide !== null){
            let order_id,weight,status,tracking_id;
            let itemsParcel=[];

        ordersValide.orders.sort(function(a,b){
            let c = new Date(a.date);
            let d = new Date(b.date);
            return c-d;
        })

        ordersValide.orders.reverse();

        ordersValide.orders.map(order =>{
            order_id = order.id;
            let itemsWithWeight =  mergeIdenticalItem(getProductNameWithWeight(order.items,items))

            let totalWeight = getOrderTotalWeight(itemsWithWeight);
            let nbOfParcelsNeeded = Math.ceil(totalWeight/30);
            let createdParcels =  createParcels(nbOfParcelsNeeded);

            let ImmutableParcels = Immutable(createdParcels);

            console.log(ImmutableParcels)


                itemsWithWeight.map(item =>{
                    for(let i = 0 ; i<= item.quantity;i++){
                        let sendToParcel={}
                        if(item.quantity >0 ){
                            sendToParcel = {
                                item_id : item.item_id,
                                quantity : 1,
                            }
                    }
                        for(let i = 0; i<item.quantity ;i ++){
                            if(createdParcels[i].weight + parseFloat(item.weight) < 30 && item.quantity >0){
                                //createdParcels[i].push(sendToParcel)

                                createdParcels[i].items[i].splice();
                                createdParcels[i].weight+=parseFloat(item.weight);
                                item.quantity = item.quantity -1;
                            }

                        }
                    }

                })
               let a = 1;
            createdParcels.map(item => {
                item.weight += a;
                console.log(item);
            })
            //console.log("itemsWithWeight")
            //console.log(itemsWithWeight)

            //console.log("itemsParcel")
            //console.log(itemsParcel)

        })

        rows = ordersValide.orders.slice(0,ordersNumber).map((order) => {
            return <Parcel
                key={order.id}
                order={order}
                items={itemsValide}
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
                            <th scope="col">ID</th>
                            <th scope="col">Objets</th>
                            <th scope="col">Poids</th>
                            <th scope="col">Etat</th>
                            <th scope="col">Suivi</th>
                            <th scope="col">N°Palette</th>
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
