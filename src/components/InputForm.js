import React, { useState } from "react";

// props.validateProduct( sku )     -- checks sku exists
// props.addToBasket( {sku, qty} )  -- will do calcs and add it to basket list

const InputForm = ({ validateProduct, addToBasket }) => {
	const [sku, setSku] = useState("");
	const [qty, setQty] = useState(0);

	const [invalidSKU, setInvalidSKU] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		let skuIsValid = validateProduct(sku);
		setInvalidSKU(!skuIsValid);

		if (skuIsValid) {
			addToBasket({ sku, qty });
			resetFields();
		}
	};

	const resetFields = () => {
		setSku("");
		setQty(""); // 0?
	};

	return (
		<form id="input-form" onSubmit={handleSubmit}>
			<label for="sku">SKU: </label>
			<input
				type="text"
				id="sku"
				name="sku"
				required
                // style={ () => "text-transform: uppercase" }
				value={sku}
				onChange={(e) => setSku(e.target.value)}
			/>

			<label for="qty">Quantity: </label>
			<input
				type="text"
				id="qty"
				name="qty"
				required
				value={qty}
				onChange={(e) => setQty(e.target.value)}
			/>

			<button type="submit">Buy</button>
			<button onClick={(e) => resetFields()}>Reset</button>

			{invalidSKU && <p id="message-invalid-sku">The product doesn't exist!</p>}
		</form>
	);
};

export default InputForm;
