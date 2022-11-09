//import React, { useState } from "react";

// index={index}
// item={element} -- basket object
// deleteFromBasket={deleteFromBasket}

const BasketItem = ({ index, item, deleteFromBasket }) => {
	return (
		<>
			<div className="basket-item">
				<div>{item.sku}</div>
				<div>{item.qty}</div>
				<div>{item.price}</div>
                <div>{item.value}</div>
				<button onClick={() => deleteFromBasket(index)}>delete</button>
			</div>
		</>
	);
};

export default BasketItem;
