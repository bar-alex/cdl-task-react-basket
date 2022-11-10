import React, { useEffect, useState } from "react";
import "./App.css";

import ProductList from "./components/ProductList";
import InputForm from "./components/InputForm";
import BasketItem from "./components/BasketItem";
import BasketTotal from "./components/BasketTotal";

import {
	retrieveProducts,
	getProductFromSKU,
	validateProductSKU,
	calculateTotal,
} from "./components/functions";
import ModeBasket from "./components/ModeBasket";


const App = () => {
	// {sku, qty, price, value}
	const [basket, setBasket] = useState([]);

  // c/s (lower) = condensed/spread
  const [modeBasket, setModeBasket] = useState('c') 

	// add SKU + qty to basket
	const addToBasket = ({ sku, qty }) => {
		console.log("addToBasket - arguments", sku, qty);

		if (!validateProductSKU(sku) || qty <= 0) {
			console.log("err:addToBasket => SKU is invalid or qty < 1 => ", sku, qty);
			return;
		}

		const product = getProductFromSKU(sku);

		if (product === null) {
			console.log( "err:addToBasket => SKU returned no product => ",sku,product);
			return;
		}

		setBasket([
			...basket,
			{
				sku,
				qty,
				price: product.price,
				value: product.price * qty,
			},
		]);

		calculateTotal();
	};


	const deleteFromBasket = (indexToDelete) =>
		setBasket([...basket.filter((element, index) => index !== indexToDelete)]);


	return (
		<div id="app-container">

      <ModeBasket modeBasket={modeBasket} setModeBasket={setModeBasket} />

			<ProductList />

			<InputForm
				validateProductSKU={validateProductSKU}
				addToBasket={addToBasket}
			/>

			{basket.length === 0 ? (
				<p className="empty-content-text">The basket is empty</p>
			) : (
				<p className="subtitle"> Basket items</p>
			)}

			<ul className="list-items">
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

			{/* <p>{calculateTotal(basket).totalValue}</p> */}
			<BasketTotal basket={basket} />
		</div>
	);
};

export default App;
