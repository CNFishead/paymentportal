import ProductType from "../types/ProductType";
export default [
  {
    _id: "1",
    name: "Syngasifier 1",
    price: 100,
    shortDescription:
      "The easy-to-use, low-maintenance solution for reliable and efficient energy production. Made in the USA with an improved stratified downdraft gasifier design, this innovative product produces clean-burning gas for heating or combustion engines without pre-charring your fuel.",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: ["https://globalhealthandhome.com/wp-content/uploads/2024/01/AM_IMG_8047-2-300x300.jpg"],
    noLimit: true,
    quantity: 0,
  },
  {
    _id: "2",
    name: "Syngasifier 2",
    price: 200,
    shortDescription:
      "The easy-to-use, low-maintenance solution for reliable and efficient energy production. Made in the USA with an improved stratified downdraft gasifier design, this innovative product produces clean-burning gas for heating or combustion engines without pre-charring your fuel.",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: ["https://globalhealthandhome.com/wp-content/uploads/2024/01/AM_IMG_8047-2-300x300.jpg"],
    quantity: 10,
    limit: 3,
  },
  {
    _id: "3",
    name: "Syngasifier 3",
    price: 300,
    shortDescription:
      "The easy-to-use, low-maintenance solution for reliable and efficient energy production. Made in the USA with an improved stratified downdraft gasifier design, this innovative product produces clean-burning gas for heating or combustion engines without pre-charring your fuel.",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: ["https://globalhealthandhome.com/wp-content/uploads/2024/01/AM_IMG_8047-2-300x300.jpg"],
    noLimit: true,
    limit: 3,
    quantity: 0,
  },
] as ProductType[]; // <-- this is the type of the array
