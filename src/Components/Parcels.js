import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Button} from "reactstrap";

class Parcels extends Component {

    render() {

        return (
            <div className={"container"}>
                <h1 className={"mx-auto p-3 bg-dark text-white text-center"}>Palettes</h1>
                <Link to={`/`} ><Button className={"marginright p-3 col-md-2 margintop bg-primary border-0 rounded float-left"}>Retour</Button></Link>
            </div>
        );
    }
}

export default Parcels;
