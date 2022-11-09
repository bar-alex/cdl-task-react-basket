import jsonProducts from "../data/products.json";


// retrieve the list of products -- {sku, price, offer (x for y), singleOffer} -- for now, from json
export const retrieveProducts = () => jsonProducts


// return the product for provided SKU
export const getProductSKU = (productSKU) => {
	try {
        console.log( productSKU, typeof productSKU );
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
	getProductSKU(productSKU) !== null;


