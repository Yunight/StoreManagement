

// ALL UTILITIES FUNCTIONS

import axios from "axios";
import Immutable from "seamless-immutable";

export function getProductName(orderProducts, NamedProducts) {

    const nameProducts = [];

    orderProducts.map((item) => {
        NamedProducts.items.map((namedItem) => {
            if(namedItem.id === item.item_id){
                let NamedProducts = {
                    "item_id": namedItem.name,
                    "quantity" : item.quantity
                }
                nameProducts.push(NamedProducts);
            }
        })

    })

    return nameProducts

}

export function getProductNameWithWeight(orderProducts,NamedProducts) {

    const nameProducts = [];

    orderProducts.map((item) => {
        NamedProducts.items.map((namedItem) => {
            if(namedItem.id === item.item_id){
                let NamedProducts = {
                    "item_id": namedItem.name,
                    "quantity" : item.quantity,
                    "weight" : namedItem.weight,
                }
                nameProducts.push(NamedProducts);
            }
        })

    })

    return nameProducts

}

export function mergeIdenticalItem(productslist){
    let output = [];

    productslist.forEach(function(item) {
        let existing = output.filter(function(v, i) {
            return v.item_id === item.item_id;
        });
        if (existing.length) {
            let existingIndex = output.indexOf(existing[0]);
            output[existingIndex].quantity = output[existingIndex].quantity+item.quantity;
        } else {
            output.push(item);
        }
    });

    //console.log(output)

    return output
}

export function parcelIsOverweight(productsWeight, addedProduct) {

    let parcelWeight = 0;

    productsWeight.map(product => {
        parcelWeight +=  parseFloat(product.weight)
    })

    if(parcelWeight + addedProduct.weight > 30) {
        return true
    }else{
        return false
    }

}

export function getOrderTotalWeight(orders){
    let totalWeight = 0;

    orders.map(product => {
        totalWeight +=  parseFloat(product.weight)*product.quantity;
    })

    return totalWeight.toFixed(2);
}

export function createParcels(amount){

    let parcels=Immutable([]);

    let parcelUnity  = {
        'order_id' : 0,
        'items': [],
        'weight':0,
        "status":"En attente",
        "tracking_id":null,
        "palette_number" :null,
    }

    if(amount>0){
        for(let i = 0 ; i<amount ; i++){
            var parcels2 = parcels.concat(Immutable(parcelUnity))

        }
    }

    return parcels2
}

export function generateTrackingID(parcels){

    let trackingID = ''

    parcels.map(parcel => {
        parcel.tracking_id = axios.get("https://helloacm.com/api/random/?n=15")
            .then(response => {
                trackingID = response.data;
            })
    })


    return parcels
}

export function availableParcel(parcels) {

    parcels.map(parcel => {
        let availableWeight = 30 - parcel.weight
        if(availableWeight > 0){
            return true;
        }else {
            return false;
        }
    })
}



