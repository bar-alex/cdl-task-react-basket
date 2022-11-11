//import React, { useState } from "react";
import { retrieveProducts } from "./functions";

const ProductList = () => {
	const products = retrieveProducts();
	// console.log("ProductList: products.length = ", products.length);

	return (
		<details id="product-list">
			<summary className="subtitle">List of products</summary>

			<div className="table">
				<span>SKU</span>
				<span>Price</span>
				<span>Offer</span>
				<span>Just once</span>

				{products.map((el, index) => {
					return (
						<>
							<span>{el.sku}</span>
							<span>{el.price}p</span>
							<span>
								{el.offer}
								{el.offer ? "p" : ""}
							</span>
							<span>{el.singleOffer ? "yes" : ""}</span>
						</>
					);
				})}
			</div>
		</details>
	);
};

export default ProductList;
