import { calculateTotal, offerInPounds } from "./functions";

const BasketTotal = ({ basket }) => {
	const { totalValue, savings } = calculateTotal(basket);
	// savings[x] = { sku, offer, normalValue, offerValue }

	const discount = savings.reduce( (acc,{ normalValue, offerValue }) => acc + (normalValue-offerValue), 0 )
	// const savingsTot = savings.reduce( (acc,{ normalValue, offerValue }) => {
	// 	return {...acc, 
	// 		normalValue: acc.normalValue + normalValue, 
	// 		discount: acc.discount + (normalValue-offerValue)
	// 	}
	// }, {normalValue:0, discount:0} )
	// // console.log(savingsTot);

	return (
		<div id="basket-total">
			<p >Value: £{( (totalValue+discount) / 100).toFixed(2)} </p>
			<p >Discount: -£{(discount / 100).toFixed(2)} </p>
			<p className="subtitle">Total Value: £{(totalValue / 100).toFixed(2)} </p>
		</div>
	);
};

export default BasketTotal;
