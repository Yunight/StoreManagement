import React, { Component } from 'react';
import {getProductName, mergeIdenticalItem} from "../Utils/UtilitiesFunction";


class Order extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }


    render() {

        const {items,order,listOfColumns} = this.props;

        const cells = listOfColumns.map((columnName)=>{
            const columnValue = order[columnName];

            let cellContent = String(columnValue);
            if(columnName ===  "date"){
                cellContent =  <h4 className={"alignmiddle"}>{(new Date(columnValue)).toLocaleDateString('fr-FR')}</h4>;
            }

            if(Array.isArray(columnValue) && columnName === "items"){
                let arrayProductWithNames = mergeIdenticalItem(getProductName(columnValue,items))

                cellContent = <tr className={"alignLeft"}>
                    {arrayProductWithNames.map((item,index) => (
                        <li key={index}>{String(item.item_id)} - Quantité : {String(item.quantity)}</li>))}
                </tr>
            }
            return <td className={"alignmiddle"} key={columnName}>
                {cellContent}
            </td>

        });

        return (
            <tr>
                {cells}
            </tr>
        )
    }
}

export default Order;
