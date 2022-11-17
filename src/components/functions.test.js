// describe("", () => {
//     it("accepts user account props", () => {
//       const wrapper = mount(<Account user={user} />);
//       expect(wrapper.props().user).toEqual(user);
//     });
//     it("contains users account email", () => {
//       const wrapper = mount(<Account user={user} />);
//       const value = wrapper.find("p").text();
//       expect(value).toEqual("david@gmail.com");
//     });
//   });

import {
	getProductFromSKU,
	validateProductSKU,
	offerInPounds,
	calcSkuValWithOffer,
} from "./functions";


describe("Retrieving and validating SKUs", () => {
	it("retrieves product with SKU 'B'", () => {
		const productB = {
			sku: "B",
			price: 30,
			offer: "2 for 45",
			singleOffer: false,
		};
		expect(getProductFromSKU('B')).toEqual(productB);
	});
    it("validates product with SKU 'C'", () => {
        expect(validateProductSKU('C')).toStrictEqual(true);
    })
    it("invalidates product with SKU 'H'", () => {
        expect(validateProductSKU('H')).toStrictEqual(false);
    })
});


describe("Calculating values", () => {
	it("turns '3 for 130' into '3 for £1.30'", () => {
		expect(offerInPounds("3 for 130")).toEqual("3 for £1.30");
	})
	it("calculates value by applying offer on SKU=B for 2 items", () => {
		expect(calcSkuValWithOffer({sku:"B", qty:2})).toEqual(45);
	})
	it("calculates value for offer + regular on SKU=B for 3 items", () => {
		expect(calcSkuValWithOffer({sku:"B", qty:3})).toEqual(75);
	})
	it("calculates value by applying offer twice on SKU=B for 4 items", () => {
		expect(calcSkuValWithOffer({sku:"B", qty:4})).toEqual(90);
	})	
	it("calculates value by applying only 1 offer on SKU=E for 4 items", () => {
		expect(calcSkuValWithOffer({sku:"E", qty:4})).toEqual(32);
	})
})