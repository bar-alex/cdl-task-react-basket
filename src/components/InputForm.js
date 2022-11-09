import React, { useState } from "react";

// props.validateProductSKU( sku )  -- checks if sku is a product
// props.addToBasket( {sku, qty} )  -- will do calcs and add it to basket list

const InputForm = ({ validateProductSKU, addToBasket }) => {
	const [sku, setSku] = useState("");
	const [qty, setQty] = useState(0);

	const [invalidSKU, setInvalidSKU] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		let skuIsValid = validateProductSKU(sku) && qty > 0;
		setInvalidSKU(!skuIsValid);

		if (skuIsValid) {
			addToBasket({ sku, qty });
			resetFields();
		}
	};

	const resetFields = () => {
		setSku('');
		setQty(''); // 0?
	};

	return (
		<form id="input-form" onSubmit={handleSubmit}>
			<div>
				<label htmlFor="sku">SKU: </label>
				<input
					type="text"
					id="sku"
					name="sku"
					required
					// style={{ textTransform: "uppercase" }}
					// style={ () => "text-transform: uppercase" }
					value={sku}
					onChange={(e) => setSku(e.target.value.toString().toUpperCase())}
				/>
			</div>

			<div>
				<label htmlFor="qty">Quantity: </label>
				<input
					type="text"
					id="qty"
					name="qty"
					required
					value={qty}
					onChange={(e) => setQty( +e.target.value)}
				/>
			</div>

			<div>
				<button type="submit">Buy</button>
				<button onClick={(e) => resetFields()}>Reset</button>
			</div>

			{invalidSKU && <p id="message-invalid-sku">The product doesn't exist!</p>}
		</form>
	);
};

export default InputForm;
