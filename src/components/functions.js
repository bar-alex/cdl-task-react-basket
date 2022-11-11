import jsonProducts from "../data/products.json";
// export { jsonProducts as products };

// retrieve the list of products -- {sku, price, offer (x for y), singleOffer} -- for now, from json
export const retrieveProducts = () => jsonProducts;

// return the product for provided SKU
export const getProductFromSKU = (productSKU) => {
	try {
		// const products = retrieveProducts();
		const products = jsonProducts;
		//console.log( products );
		const result = products.filter(
			({ sku }) => sku.toUpperCase() === productSKU.trim().toUpperCase()
		);
		if (result.length !== 1) {
			console.log(
				`err: getProductSKU => sku ${productSKU} returned ${result.length} products instead of just 1`
			);
			return null;
		} else {
			return result[0];
		}
	} catch (error) {
		console.log(
			`getProductSKU error => while attempting to select a product: ${error}`
		);
		return null;
	}
};


// validates the SKU exists in the list of products
export const validateProductSKU = (productSKU) =>
	getProductFromSKU(productSKU) !== null;


// will calculate the total value for the basket items, accounting for offers and builds a collection with offers
// returns an object { totalValue, savings[] } 
// savings[x] = { sku, offer, normalValue, offerValue }
export const calculateTotal = (basket) => {

	if( !basket || !Array.isArray(basket) )
		return { totalValue: 0, savings: [] }

	// condensed SKUs (member name) and the sum of their quantities (values)
	const skuCollection = {}; 

	basket.forEach((elem) => {
		skuCollection[elem.sku] = skuCollection[elem.sku]
			? +skuCollection[elem.sku] + elem.qty
			: +elem.qty;
	});

	let totalValue = 0; // total to pay
	let savings = []; // savings because of offers, {sku, offer, normalValue, offerValue}

	for (const sku in skuCollection) {
		const prod = getProductFromSKU(sku);
		if (prod === null) {
			console.log("err:calculateTotal => product not found for sku: ", sku);
			continue;
		}
		const qty = skuCollection[sku]; // total quantity entered for
		const price = prod.price; // prize in products list
		const offer = prod.offer; // offer in products list ("x for y")
		const normalValue = price * qty;
		// has no offer? just price * qty
		if (!prod.offer) {
			totalValue += normalValue; // calc normal value, same as in list
		} else {
			const qtyOffer = offer.trim().split(" ")[0]; // get the x from "x for y"
			const priceOffer = offer.trim().split(" ")[2]; // get the y from "x for y"
			// if quantity larger than qtyOffer
			if (qty >= qtyOffer) {
				const multiOffer = prod.singleOffer ? 1 : Math.floor(qty / qtyOffer); // if offer not limited to 1, calc how many times will be applied
				const restQty = prod.singleOffer ? qty - qtyOffer : qty % qtyOffer; // the remaining quantity not used in offers
				// add offer price to total value, and restQty for normal price
				const offerValue = priceOffer * multiOffer;
				const restValue = price * restQty;
				totalValue += offerValue + restValue;
				// add the offer to savings
				savings.push({ sku, offer, normalValue:normalValue-restValue, offerValue });
			} else {
				totalValue += normalValue;
			}
		}
	}

	return { totalValue, savings };
};


// will calculate the value for an sku and a qty using the offer, if it has any
export const calcSkuValWithOffer = ({sku, qty}) => {
	const prod = getProductFromSKU(sku);
	if (prod === null) {
		console.log("err:calcSkuValWithOffer => product not found for sku: ", sku);
		return null
	}
	const price = prod.price; // prize in products list
	const offer = prod.offer; // offer in products list ("x for y")
	const normalValue = price * qty;	
	// has no offer? just price * qty
	if (!prod.offer) {
		return normalValue; // calc normal value, same as in list
	} else {
		const qtyOffer 	 = offer.trim().split(" ")[0]; // get the x from "x for y"
		const priceOffer = offer.trim().split(" ")[2]; // get the y from "x for y"
		// if quantity larger than qtyOffer
		if (qty >= qtyOffer) {
			const multiOffer = prod.singleOffer ? 1 : Math.floor(qty / qtyOffer); // if offer not limited to 1, calc how many times will be applied
			const restQty = prod.singleOffer ? qty - qtyOffer : qty % qtyOffer; // the remaining quantity not used in offers
			// add offer price to total value, and restQty for normal price
			const offerValue = priceOffer * multiOffer;
			const restValue = price * restQty;
			// 
			return offerValue + restValue;
		} else {
			return normalValue;
		}
	}
}


// turns "3 for 130" into "3 for £1.30"
export const offerInPounds = (offerPence) => 
	offerPence
		.split(" ")
		.map((_, idx) => (idx < 2 ? _ : "£" + (_ / 100).toFixed(2)))
		.join(" ");

