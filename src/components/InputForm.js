import React, { useRef, useState } from "react";

// props.validateProductSKU( sku )  -- checks if sku is a product
// props.addToBasket( {sku, qty} )  -- will do calcs and add it to basket list

const InputForm = ({ validateProductSKU, addToBasket }) => {

	const inputSkuRef = useRef()

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
		} else {
			inputSkuRef.current?.focus()
		}
	};

	const resetFields = () => {
		setSku("");
		setQty(0); // 0?
		inputSkuRef.current?.focus()
	};

	return (
		<form id="input-form" onSubmit={handleSubmit}>
			<div>
				<label htmlFor="sku">SKU: </label>
				<input
					ref={inputSkuRef}
					type="text"
					id="sku"
					name="sku"
					required
					autoComplete="off"
					// style={{ textTransform: "uppercase" }}
					// style={ () => "text-transform: uppercase" }
					value={sku}
					onChange={(e) => setSku(e.target.value.toString().toUpperCase())}
				/>
			</div>

			<div>
				<label htmlFor="qty">Quantity: </label>
				<input
					type="number"
					min="1"
					id="qty"
					name="qty"
					required
					value={qty}
					onChange={(e) => setQty(+e.target.value)}
				/>
			</div>

			<div>
				<button type="submit">Buy</button>
				<button onClick={(e) => resetFields()}>Reset</button>
			</div>

			{ (invalidSKU && 
				<span className="warning-message">
				{ qty>0 ? "The product doesn't exist!" : "The quantity wasn't specified" }
				</span>
			)}
		</form>
	);
};

export default InputForm;
