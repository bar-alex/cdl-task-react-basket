import React, { useEffect, useState } from "react";
import "./App.css";

import ProductList from "./components/ProductList";
import InputForm from "./components/InputForm";
import ModeBasket from "./components/ModeBasket";
import BasketList from "./components/BasketList";
import BasketItem from "./components/BasketItem";
import BasketSavings from "./components/BasketSavings";
import BasketTotal from "./components/BasketTotal";

import {
	retrieveProducts,
	getProductFromSKU,
	validateProductSKU,
	calculateTotal,
  calcSkuValWithOffer,
} from "./components/functions";



const App = () => {
	// {sku, qty, price, value}
	const [basket, setBasket] = useState([]);
  // c/s (lower) = condensed/spread
  const [modeBasket, setModeBasket] = useState('c') 

  // turns the basket into a list with unique SKUs and cumulated quantity
  const makeBasketCondensed = () => {
    // get an obj with sku as key and total qty as value
    let uniqueSkuQty = {}
    basket.forEach( (elem) => uniqueSkuQty[elem.sku] = (uniqueSkuQty[elem.sku] || 0) + elem.qty );
    const products = retrieveProducts()
    const newBasket = products
      .filter( (elem) => elem.sku in uniqueSkuQty )
      .map( (elem) => {
        return {
          sku: elem.sku,
          qty: uniqueSkuQty[elem.sku],
          price: elem.price,
          value: calcSkuValWithOffer({ sku:elem.sku, qty:uniqueSkuQty[elem.sku] }),
          offer: elem.offer, // used by condensed
        }
      } )

    setBasket( newBasket )
  }


  // turns condensed format to spread format
  const makeBasketSpread = () => {
    const newBasket = basket.map( (elem) => {
      return {...elem,value: elem.price*elem.qty}
    } )
    setBasket( newBasket )
  }


  // will switch between condensed and spread
  useEffect( ()=>{
    if(modeBasket === 'c') 
      makeBasketCondensed()
    if(modeBasket === 's')
      makeBasketSpread()
  },[modeBasket]) // eslint-disable-line react-hooks/exhaustive-deps


	// add SKU + qty to basket
	const addToBasket = ({ sku, qty }) => {

		if (!validateProductSKU(sku) || qty <= 0) {
			console.log("err:addToBasket => SKU is invalid or qty < 1 => ", sku, qty);
			return;
		}

		const product = getProductFromSKU(sku);

		if (product === null) {
			console.log( "err:addToBasket => SKU returned no product => ",sku,product);
			return;
		}

    if(modeBasket==='s'){

      const newBasket = [
        ...basket,
        {
          sku,
          qty,
          price: product.price,
          value: product.price * qty,  
          offer: '', // not used  by spread
        },
      ]
      setBasket(newBasket);

    } else if (modeBasket==='c') {

      const condensedQty = basket.filter( (elem) => elem.sku===sku )[0]?.qty || 0;
      const newBasket = [
        ...basket.filter( (elem) => elem.sku!==sku ), // without this sku
        {
          sku,
          qty: condensedQty + qty,
          price: product.price,
          value: calcSkuValWithOffer({sku, qty:condensedQty + qty}),
          offer: product.offer, // used by condensed
        },
      ]
      setBasket(newBasket);

    } 

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
