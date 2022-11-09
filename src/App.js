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
    const skuCollection = {}; 
    basket.forEach( 
      ( element ) => skuCollection[element.sku] += skuCollection[element.qty] 
    )
    console.log( 'calculateTotal => ', skuCollection );
  }
  

  // useEffect( () => console.log('useEffect called') , basket)


	return (
		<div className="app-container">
			{/* <p> This is a App test</p> */}

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
						<li className="basket-line">
							<BasketItem
								key={index}
								index={index}
								item={element}
								deleteFromBasket={deleteFromBasket}
							/>
						</li>
					))}
			</ul>

			<BasketTotal />
		</div>
	);
};

export default App;
