import jsonProducts from "../data/products.json";

// retrieve the list of products -- {sku, price, offer (x for y), singleOffer} -- for now, from json
export const retrieveProducts = () => jsonProducts;

// return the product for provided SKU
export const getProductFromSKU = (productSKU) => {
	try {
		console.log(productSKU, typeof productSKU);
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

	console.log("calculateTotal => ", skuCollection);

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
			console.log(
				`calculateTotal => product sku: ${sku} has offer "${offer}" and I got qtyOffer ${qtyOffer} and priceOffer ${priceOffer} `
			);
			// if quantity larger than qtyOffer
			if (qty >= qtyOffer) {
				const multiOffer = prod.singleOffer ? 1 : Math.floor(qty / qtyOffer); // if offer not limited to 1, calc how many times will be applied
				const restQty = prod.singleOffer ? qty - qtyOffer : qty % qtyOffer; // the remaining quantity not used in offers
				// add over price to total value, and restQty for normal price
				const offerValue = priceOffer * multiOffer + price * restQty;
				totalValue += offerValue;
				// add the offer to savings
				savings.push({ sku, offer, normalValue, offerValue });
				console.log(
					`calculateTotal => saved another offer in savings: `,
					savings
				);
			} else {
				totalValue += normalValue;
			}
		}
	}

	return { totalValue, savings };
};
