//import React, { useState } from "react";
import { retrieveProducts } from "./functions";

const ProductList = () => {
	
	const products = retrieveProducts();
	// console.log("ProductList: products.length = ", products.length);

	return (
		<details>
			<summary>List of products</summary>
			<pre>
				<div>{"SKU  | price | offer      | single "}</div>

				{products.map((el, index) => {
					return (
						<div key={index}>
							{" "}
							{el.sku.padEnd(4)} | {el.price.toString().padStart(5)} |{" "}
							{el.offer.padEnd(10)} | { el.singleOffer ? "yes".padEnd(8) : " ".padEnd(8)}
						</div>
					);
				})}
			</pre>
		</details>
	);
};

export default ProductList;
