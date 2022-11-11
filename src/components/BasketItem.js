const BasketItem = ({ index, item, deleteFromBasket, modeBasket }) => {
	return (
		<>
			<span className="basket-item">{item.sku}</span>
			<span className="basket-item">£{(item.price / 100).toFixed(2)}</span>
			<span className="basket-item">{item.qty}</span>
			<span className="basket-item">£{(item.value / 100).toFixed(2)}</span>

			{modeBasket === "c" && <span className="basket-item">{item.offer}</span>}

			<span className="basket-item">
				<button onClick={() => deleteFromBasket(index)}>delete</button>
			</span>
		</>
	);
};

export default BasketItem;
