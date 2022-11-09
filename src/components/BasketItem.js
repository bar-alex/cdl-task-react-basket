//import React, { useState } from "react";

// index={index}
// item={element} -- basket object
// deleteFromBasket={deleteFromBasket}

const BasketItem = ({ index, item, deleteFromBasket }) => {
	return (
		<>
			<div className="basket-item">
				<span>{item.sku}</span>
				<span>{item.qty}</span>
                <button onClick={ () => deleteFromBasket(index) }>delete</button>
			</div>
		</>
	);
};

export default BasketItem;
