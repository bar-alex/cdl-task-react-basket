const ModeBasket = ({ modeBasket, setModeBasket }) => {
	// console.log("ModeBasket =>", modeBasket, setModeBasket);

	return (
		<div id="mode-basket">
			<p
				sele={modeBasket === "c" ? "true" : null} //
				onClick={() => setModeBasket("c")}
			>
				Condensed
			</p>
			<p
				sele={modeBasket === "s" ? "true" : null} //
				onClick={() => setModeBasket("s")}
			>
				Spread
			</p>
			<p>
				{modeBasket === "c"
					? "One line per SKU, quantities are cumulated, values include offers"
					: modeBasket === "s"
					? "SKUs in order of entry, values don't include offers, savings are calculated before total"
					: ""}
			</p>
		</div>
	);
};

export default ModeBasket;
