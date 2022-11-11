import React, { useState } from "react";
import "./App.css";

import ProductList from "./components/ProductList";
import InputForm from "./components/InputForm";
import ModeBasket from "./components/ModeBasket";
import BasketList from "./components/BasketList";
import BasketItem from "./components/BasketItem";
import BasketSavings from "./components/BasketSavings";
import BasketTotal from "./components/BasketTotal";

import {
	// retrieveProducts,
	getProductFromSKU,
	validateProductSKU,
	calculateTotal,
} from "./components/functions";



const App = () => {
	// {sku, qty, price, value}
	const [basket, setBasket] = useState([]);

  // c/s (lower) = condensed/spread
  const [modeBasket, setModeBasket] = useState('c') 

	// add SKU + qty to basket
	const addToBasket = ({ sku, qty }) => {
		console.log("addToBasket - arguments", sku, qty);

		if (!validateProductSKU(sku) || qty <= 0) {
			console.log("err:addToBasket => SKU is invalid or qty < 1 => ", sku, qty);
			return;
		}

		const product = getProductFromSKU(sku);

		if (product === null) {
			console.log( "err:addToBasket => SKU returned no product => ",sku,product);
			return;
		}

		setBasket([
			...basket,
			{
				sku,
				qty,
				price: product.price,
				value: product.price * qty,
			},
		]);

		calculateTotal();
	};


	const deleteFromBasket = (indexToDelete) =>
		setBasket([...basket.filter((element, index) => index !== indexToDelete)]);


	return (
		<div id="app-container">

      <ModeBasket 
        modeBasket={modeBasket} 
        setModeBasket={setModeBasket} 
      />

			<ProductList />

			<InputForm
				validateProductSKU={validateProductSKU}
				addToBasket={addToBasket}
			/>

      <BasketList basket={basket} modeBasket={modeBasket}>
        {basket.length > 0 &&
          basket.map((elem, index) => (
              <BasketItem
                key={index}
                index={index}
                item={elem}
                modeBasket={modeBasket}
                deleteFromBasket={deleteFromBasket}
              />
          ))}
      </BasketList>

      {modeBasket==='s' && <BasketSavings basket={basket}/>}

      <BasketTotal basket={basket} />

		</div>
	);
};

export default App;




{/* <ul className="list-items">
{basket.length > 0 &&
  basket.map((elem, index) => (
    <li className="basket-line" key={index}>
      <BasketItem
        key={index}
        index={index}
        item={elem}
        modeBasket={modeBasket}
        deleteFromBasket={deleteFromBasket}
      />
    </li>
  ))}
</ul> */}
