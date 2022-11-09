import React, { useState } from "react";
import "./App.css";

import ProductList from "./components/ProductList";
import InputForm from "./components/InputForm";
import BasketItem from "./components/BasketItem";
import BasketTotal from "./components/BasketTotal";

//const products = JSON.parse( '../data/products.json' );
const products = [
	{
		sku: "A",
		price: 50,
		offer: "3 for 130",
		singleOffer: false,
	},
];


const App = () => {
	const [basket, setBasket] = useState([]);
	// {sku, qty, price, value}

	// makes sure sku exists
	const validateProduct = (skuToCheck) =>
		products.filter(
			({ sku }) => sku.toUpperCase() === skuToCheck.trim().toUpperCase()
		).length > 0;


	// calc value and
	const addToBasket = ({ sku, qty }) => {
		if (!validateProduct(sku) || qty === 0) {
			console.log(
				"err: addToBasket => sku is invalid or qty is 0 => ",
				sku,
				qty
			);
			return;
		}

		const productSKU = products.filter(
			({ sku: prodSKU }) => prodSKU.toUpperCase() === sku.trim().toUpperCase()
		);

		if (productSKU.length !== 1) {
			console.log(
				"err: addToBasket => sku code didn't returned a single product => ",
				sku,
				productSKU
			);
			return;
		}

		setBasket(...basket, {
			sku,
			qty,
			price: productSKU[0].price,
			value: qty * productSKU[0].price,
		});
	};

	const deleteFromBasket = (indexToDelete) =>
		setBasket(basket.filter((element, index) => index !== indexToDelete));

	return (
		<div className="app-container">

      <p> This is a App test</p>

			<ProductList />

			<InputForm validateProduct={validateProduct} addToBasket={addToBasket} />

			{basket.length === 0 && (
				<p id="message-empty-basket">The basket is empty</p>
			)}

			<ul classNAme="basket-list">
				{basket.length > 0 &&
					basket.forEach((element, index) => (
						<li className="basket-line">
							<BasketItem key={index} index={index} item={element} />
						</li>
					))}
			</ul>

			<BasketTotal />

		</div>
	);
};

export default App;
