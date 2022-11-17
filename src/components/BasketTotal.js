import { calculateTotal } from "./functions";

const BasketTotal = ({ basket }) => {
	const { totalValue, savings } = calculateTotal(basket);
	// savings[x] = { sku, offer, normalValue, offerValue }

	const discount = savings.reduce(
		(acc, { normalValue, offerValue }) => acc + (normalValue - offerValue),
		0
	);
	const sign = discount!==0?'-':'';

	return (
		<div id="basket-total">
			<p data-value={totalValue + discount}>
				Value: £{((totalValue + discount) / 100).toFixed(2)}{" "}
			</p>
			<p data-value={discount}>
				Discount: {sign}£{(discount / 100).toFixed(2)}{" "}
			</p>
			<p data-value={totalValue} className="subtitle">
				Total Value: £{(totalValue / 100).toFixed(2)}{" "}
			</p>
		</div>
	);
};

export default BasketTotal;
