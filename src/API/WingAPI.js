import axios from 'axios'

//ALL API CALLS

//simulating api calls with hosted json

const storeItems = "https://api.myjson.com/bins/11b0py"
const orders = "https://api.myjson.com/bins/9x2w6"

export function getWingItems(){

    axios.get(storeItems)
        .then(function (response) {
            // handle success
           // console.log(response);
        })
        .catch(function (error) {
            // handle error
            //console.log(error);
        })
        .then(function () {
            // always executed
        });
}

export function getWingOrders(){

    axios.get(orders)
        .then(function (response) {
            // handle success
            //console.log(response);
        })
        .catch(function (error) {
            // handle error
            //console.log(error);
        })
        .then(function () {
            // always executed
        });
}

