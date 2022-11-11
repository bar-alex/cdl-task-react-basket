// for modeBasket condensed I have an Offer column

const BasketList = ({ basket, children, modeBasket }) => {
	return (
		<div id="basket">
			<p className="subtitle">Basket items</p>

			{basket.length === 0 && (
				<p className="empty-content-text">The basket is empty</p>
			)}

			<div className={modeBasket === 'c' ? "basket-grid basket-grid-c" : "basket-grid basket-grid-s"}>

                <span className="col-sku">SKU</span>
                <span className="col-price">Price</span>
                <span className="col-qty">Qty</span>
                <span className="col-value">Value</span>
                {modeBasket === 'c' && <span className="col-offer">Offer</span>}
                <span className='col-del'>Delete</span>

                {/* the rows in the basket */}
				{children}
			</div>

		</div>
	);
};

export default BasketList;
