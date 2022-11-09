
import React, { useState } from 'react';
import './App.css';
import EntryForm from './components/EntryForm';


//const products = JSON.parse( '../data/products.json' );
const products =[
  {
      "sku": "A",
      "price": 50,
      "offer": "3 for 130",
      "singleOffer": false
  },
]


const App = () => {

  const [basket, setBasket] = useState( [] );
  // {sku, qty, price, value}


  // makes sure sku exists
  const validateProduct = (skuToCheck) => products
    .filter( ({sku}) => sku.toUpperCase() === skuToCheck.trim().toUpperCase() )
    .length > 0;

  
  // calc value and 
  const addToBasket = ( {sku, qty} ) => {
    
    if( !validateProduct(sku) || qty==0 ){
      console.log('err: addToBasket => sku is invalid or qty is 0 => ',sku,qty);
      return 
    }

    const product = product.filter( ({sku:prodSKU}) => prodSKU.toUpperCase() === sku.trim().toUpperCase() )

    if(product.length!=1) {
      console.log('err: addToBasket => sku code didn\'t returned a single product => ',sku,qty);
      return 
    }

    setBasket( {
      sku, qty, 

    } )
    

  }


  return (
    <div className="app-container">

      

      <EntryForm />

    </div>
  );
}

export default App;
