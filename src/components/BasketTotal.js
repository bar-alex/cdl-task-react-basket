//import React, { useState } from "react";

import { calculateTotal } from "./functions";


const BasketTotal = ({ basket }) => {

    const { totalValue, savings } = calculateTotal(basket);
    // savings[x] = { sku, offer, normalValue, offerValue }


    // turns "3 for 130" into "3 for £1.30"
    const offerInPounds = (offerPence) => 
        offerPence
        .split(' ')
        .map( (_,idx) => idx<2 ? _ : '£'+(_/100).toFixed(2) )
        .join(' ');
    

    return (
        <div id="basket-total">
            { savings.length>0 && <span className="subtitle">Savings from offers: </span> }

            { savings.length>0 && savings.map( (elem, index) => 
                ( <div className="savings-offer" key={index}>   
                    <span> {elem.sku} ( { offerInPounds(elem.offer) } ) </span>
                    <span> £{ ((elem.normalValue - elem.offerValue)/100).toFixed(2) } </span>
                </div> )

            ) }

            <p className="subtitle">Total Value: £{ (totalValue/100).toFixed(2) } </p>
        </div>)
}

export default BasketTotal;