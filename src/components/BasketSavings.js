import {
	calculateTotal,
    offerInPounds
} from "./functions";

const BasketSavings = ({basket}) => {
	const { savings } = calculateTotal(basket);

	if (savings.length === 0) return <></>;

	return (
		<>
			<p className="subtitle">Savings from offers: </p>

            <div className="savings-grid">
                <span>Offer</span>
                <span>Original value</span>
                <span>Offer Value</span>
                <span>Discount</span>

                {savings.map((elem, index) => (
                    <>
                        <span> {elem.sku}: {elem.offer}p </span>
                        {/* <span> {offerInPounds(elem.offer)} </span> */}
                        <span> £{ (elem.normalValue / 100).toFixed(2) }</span>
                        <span> £{ (elem.offerValue / 100).toFixed(2) }</span>
                        <span> -£{ ((elem.normalValue - elem.offerValue) / 100).toFixed(2) }</span>
                    </>
                ))}

            </div>
		</>
	);
};

export default BasketSavings;



{
	/* <div className="savings-offer" key={index}>

<span> {elem.sku} </span>
// the offer
<span> {offerInPounds(elem.offer)} </span>
// normal value
<span>
    ( £{(elem.normalValue / 100).toFixed(2)} - £
    {(elem.offerValue / 100).toFixed(2)} )
</span>
<span>
    = £{((elem.normalValue - elem.offerValue) / 100).toFixed(2)}{" "}
</span>

</div> */
}
