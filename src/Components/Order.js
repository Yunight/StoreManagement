import React, { Component } from 'react';
import {getProductName, mergeIdenticalItem} from "../Utils/UtilitiesFunction";


class Order extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }


    handleClick= (event) =>  {

        const{onRowClick, order } = this.props;

        onRowClick(event,order)
    }

    render() {

        const {items,order,listOfColumns,selectedState} = this.props;

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

        let className = (selectedState) ? "blue" : "white";

        return (
            <tr onClick={this.handleClick} className={className}>
                {cells}
            </tr>
        )
    }
}

export default Order;
