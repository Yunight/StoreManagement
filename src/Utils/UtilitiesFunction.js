

// ALL UTILITIES FUNCTIONS

export function getProductName(orderProducts,NamedProducts) {

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
        parcelWeight = parcelWeight + product.weight
    })

    if(parcelWeight + addedProduct.weight > 30) {
        return true
    }else{
        return false
    }

}

