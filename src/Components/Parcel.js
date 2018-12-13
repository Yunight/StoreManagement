import React, {Component} from 'react';
import axios from "axios";


class Parcel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            generateID : true,
            trackingID : null,
        };

    }

    componentDidMount() {
        axios.get(`https://helloacm.com/api/random/?n=15`)
            .then(res => {
                const trackingID = res.data;
                this.setState({ trackingID });
            })
    }

    render() {
        const {order,listOfColumns} = this.props;

        const cells = listOfColumns.map((columnName)=>{
            const columnValue = order[columnName];

            let cellContent = String(columnValue);
            if(columnName ===  "date"){
                cellContent =  <h4 className={"alignmiddle"}>{(new Date(columnValue)).toLocaleDateString('fr-FR')}</h4>;
            }

            if(columnName == "tracking_id" ){

                cellContent = this.state.trackingID;
            }
            if(Array.isArray(columnValue) && columnName === "items"){

                cellContent = <tr className={"alignLeft"}>
                    {columnValue.map((item,index) => (
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

export default Parcel;
