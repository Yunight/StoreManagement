

// ALL UTILITIES FUNCTIONS

import axios from "axios";

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

export function createParcels(amount,itemsWithWeight,order_id){

    let totalparcels = [];

    if(amount>0){

        for(let i = 0 ; i<amount ; i++){
            let filledParcel={};
            let parcelsingleProduct  = {
                'order_id' : 0,
                'items': [],
                'weight':0,
                "status":"à livrer",
                "tracking_id":null,
                "palette_number" :null,
                "price" : null,
            }

            itemsWithWeight.map(item =>{
                if(item.quantity != 0){

                for(let i = 0 ; i<= item.quantity;i++){

                    let sendToParcel={}
                    if(item.quantity >0 && parcelsingleProduct.weight + parseFloat(item.weight) <30){
                        sendToParcel = {
                            item_id : item.item_id,
                            quantity : 1,
                        }
                        item.quantity -= 1
                        if(item.quantity == 0) {

                        }
                        parcelsingleProduct.weight += parseFloat(item.weight);
                        parcelsingleProduct.items.push(sendToParcel)
                    }

                    parcelsingleProduct.weight = parseFloat(parcelsingleProduct.weight.toFixed(2));

                }
                }
            })
            parcelsingleProduct.order_id = order_id

            parcelsingleProduct.items = mergeIdenticalItem(parcelsingleProduct.items)
            filledParcel = parcelsingleProduct;

            generateTrackingID(filledParcel)
            totalparcels.push(filledParcel);
        }
    }
    return totalparcels
}

export function isOverWeightAfterAddingProduct(parcel, addedProduct){

    let totalWeight = 0;
    totalWeight = parcel.weight + addedProduct.weight;
    if(totalWeight > 30) {
        return true;
    }else{
        return false;
    }
}

export function generateTrackingID(parcel){

    let trackingID = ''

    axios.get("https://helloacm.com/api/random/?n=15")
            .then(response => {
                trackingID = response.data;
            })
    return parcel
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

export function calculateParcelPrice(parcelWeight){

    let price = 0;
    if(parcelWeight>0 && parcelWeight <1){
        price = 1;
    }

    if(parcelWeight>1 && parcelWeight <5){
        price = 2;
    }

    if(parcelWeight>5 && parcelWeight <10){
        price = 3;
    }

    if(parcelWeight>10 && parcelWeight <20){
        price = 5;
    }

    if(parcelWeight>20){
        price = 10;
    }

    return price
}



