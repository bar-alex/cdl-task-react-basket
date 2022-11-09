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

import { getProductSKU, validateProductSKU } from "./functions";

describe("", () => {
	it("retrieves product with SKU 'B'", () => {
		const productB = {
			sku: "B",
			price: 30,
			offer: "2 for 45",
			singleOffer: false,
		};
		expect(getProductSKU('B')).toEqual(productB);
	});
    it("validates product with SKU 'C'", () => {
        expect(validateProductSKU('C')).toStrictEqual(true);
    })
    it("invalidates product with SKU 'H'", () => {
        expect(validateProductSKU('H')).toStrictEqual(false);
    })
});
