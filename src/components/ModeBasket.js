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
					? "Amazon style - quantities are cumulated to same SKUs, values calculated from offers"
					: modeBasket === "s"
					? "Superstore style - SKUs in order of entry, savings are calculated from the offers and displayed before total"
					: ""}
			</p>
		</div>
	);
};

export default ModeBasket;
