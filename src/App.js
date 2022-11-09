import React, { useEffect, useState } from "react";
import "./App.css";

import ProductList from "./components/ProductList";
import InputForm from "./components/InputForm";
import BasketItem from "./components/BasketItem";
import BasketTotal from "./components/BasketTotal";

import {
  retrieveProducts,
	getProductSKU,
	validateProductSKU,
} from "./components/functions";

// //const products = JSON.parse( '../data/products.json' );
// const products = [
// 	{
// 		sku: "A",
// 		price: 50,
// 		offer: "3 for 130",
// 		singleOffer: false,
// 	},
// ];

const App = () => {

  // {sku, qty, price, value}
	const [basket, setBasket] = useState([]);

	// add SKU + qty to basket
	const addToBasket = ({ sku, qty }) => {
    console.log('addToBasket - arguments',sku, qty  );

		if (!validateProductSKU(sku) || qty <= 0) {
			console.log("err:addToBasket => SKU is invalid or qty < 1 => ", sku, qty);
			return;
		}

		const product = getProductSKU(sku);

		if (product === null) {
			console.log("err:addToBasket => SKU code didn't returned a product => ",sku,product);
			return;
		}

		setBasket( [...basket, {
			sku,
			qty,
			price: product.price,
			value: product.price * qty,
		}]);

    calculateTotal()
	};


	const deleteFromBasket = (indexToDelete) => 
		setBasket( [...basket.filter((element, index) => index !== indexToDelete)] );


  const calculateTotal = () => {
    const skuCollection = {}; // instance of each SKU
    
    basket.forEach( ( elem ) => {
      skuCollection[elem.sku] = skuCollection[elem.sku] 
        ? +skuCollection[elem.sku]+ elem.qty
        : +elem.qty
    })

    console.log( 'calculateTotal => ', skuCollection );

    let totalValue = 0    // total to pay
    let savings    = []   // savings because of offers, {sku, offer, normalValue, offerValue}

    for(const sku in skuCollection){
      const prod  = getProductSKU(sku);
      if(prod === null){
        console.log('err:calculateTotal => product not found for sku: ',sku);
        continue;
      }
      const qty         = skuCollection[sku]; // total quantity entered for 
      const price       = prod.price          // prize in products list
      const offer       = prod.offer          // offer in products list ("x for y")
      const normalValue = price * qty;
      // has no offer? just price * qty
      if(!prod.offer){
        totalValue += normalValue       // calc normal value, same as in list
      } else {
        const qtyOffer   = offer.trim().split(" ")[0]   // get the x from "x for y"
        const priceOffer = offer.trim().split(" ")[2]   // get the y from "x for y"
        console.log(`calculateTotal => product sku: ${sku} has offer "${offer}" and I got qtyOffer ${qtyOffer} and priceOffer ${priceOffer} `);
        // if quantity larger than qtyOffer
        if( qty >= qtyOffer ){
          const multiOffer  = prod.singleOffer ? 1 
                              : Math.floor(qty/qtyOffer);       // if offer not limited to 1, calc how many times will be applied
          const restQty     = prod.singleOffer ? qty-qtyOffer 
                              : qty % qtyOffer;                 // the remaining quantity not used in offers
          // add over price to total value, and restQty for normal price
          const offerValue  = (priceOffer * multiOffer) + (price * restQty);
          totalValue += offerValue;
          // add the offer to savings 
          savings.push( { sku, offer, normalValue, offerValue } )
          console.log(`calculateTotal => saved another offer in savings: `, savings);
        } else {
          totalValue += normalValue
        }
      }
    }

    return totalValue;
  }
  

	return (
		<div className="app-container">

			<ProductList />

			<InputForm
				validateProductSKU={validateProductSKU}
				addToBasket={addToBasket}
			/>

			{basket.length === 0 && (
				<p id="message-empty-basket">The basket is empty</p>
			)}

			<ul id="basket-list">

				{basket.length > 0 &&
					basket.map((element, index) => (
						<li className="basket-line" key={index}>
							<BasketItem
								key={index}
								index={index}
								item={element}
								deleteFromBasket={deleteFromBasket}
							/>
						</li>
					))}

			</ul>

      <p>{calculateTotal()}</p>
			{/* <BasketTotal  /> */}
		</div>
	);
};

export default App;
