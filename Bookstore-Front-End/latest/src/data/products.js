export const products = [
  {
    id: 1,
    BookName: "The Silent Patient",
    Author: "Alex Michaelides",
    Price: 15.99,
    img: "../src/assets/Image/Product/Product6.jpg",
    viewNumber: 1000,
    star: 4.5,
    category: "Fiction",
    stock: true,
    favorite: true,
  },
  {
    id: 2,
    BookName: "The Midnight Library",
    Author: "Matt Haig",
    Price: 14.99,
    img: "../src/assets/Image/Product/Product5.jpg",
    viewNumber: 800,
    star: 4.3,
    category: "Non Fiction",
    stock: true,
    favorite: true,

  },
  {
    id: 3,
    BookName: "The Vanishing Half",
    Author: "Brit Bennett",
    Price: 16.99,
    img: "../src/assets/Image/Product/Product4.jpg",
    viewNumber: 1200,
    star: 4.7,
    category: "Non Fiction",
    stock: true,
    favorite: true,

  },
  {
    id: 4,
    BookName: "The Four Winds",
    Author: "Kristin Hannah",
    Price: 17.99,
    img: "../src/assets/Image/Product/Product3.jpg",
    viewNumber: 900,
    star: 4.6,
    category: "Business",
    stock: true,
    favorite: false,

  },
  {
    id: 5,
    BookName: "The Night Circus",
    Author: "Erin Morgenstern",
    Price: 13.99,
    img: "../src/assets/Image/Product/Product2.jpg",
    viewNumber: 1100,
    star: 4.4,
    category: "Business",
    stock: true,
    favorite: true,

  },
  {
    id: 6,
    BookName: "The Seven Husbands of Evelyn Hugo",
    Author: "Taylor Jenkins Reid",
    Price: 14.99,
    img: "../src/assets/Image/Product/Product1.jpg",
    viewNumber: 1000,
    star: 4.5,
    category: "Scinece & Tech",
    stock: true,
    favorite: false,

  },
  {
    id: 7,
    BookName: "The Silent Patient",
    Author: "Alex Michaelides",
    Price: 8.0,
    img: "../src/assets/Image/Product/Product6.jpg",
    viewNumber: 1000,
    star: 4.5,
    discount: 10,
    category: "Scinece & Tech",
    stock: true,
    favorite: false,

  },
  {
    id: 8,
    BookName: "The Midnight Library",
    Author: "Matt Haig",
    Price: 7.5,
    img: "../src/assets/Image/Product/Product5.jpg",
    viewNumber: 800,
    star: 4.3,
    discount: 15,
    category: "Scinece & Tech",
    stock: true,
    favorite: false,

  },
  {
    id: 9,
    BookName: "The Vanishing Half",
    Author: "Brit Bennett",
    Price: 8.5,
    img: "../src/assets/Image/Product/Product4.jpg",
    viewNumber: 1200,
    star: 4.7,
    discount: 15,
    category: "Romance",
    stock: true,
    favorite: false,

  },
  {
    id: 10,
    BookName: "The Four Winds",
    Author: "Kristin Hannah",
    Price: 8.5,
    img: "../src/assets/Image/Product/Product3.jpg",
    viewNumber: 900,
    star: 4.6,
    discount: 15,
    category: "Romance",
    stock: true,
    favorite: false,

  },
  {
    id: 11,
    BookName: "The Night Circus",
    Author: "Erin Morgenstern",
    Price: 7.0,
    img: "../src/assets/Image/Product/Product2.jpg",
    viewNumber: 1100,
    star: 4.4,
    discount: 15,
    category: "Romance",
    stock: true,
    favorite: false,

  },
  {
    id: 12,
    BookName: "The Seven Husbands of Evelyn Hugo",
    Author: "Taylor Jenkins Reid",
    Price: 7.5,
    img: "../src/assets/Image/Product/Product1.jpg",
    viewNumber: 1000,
    star: 4.5,
    discount: 15,
    category: "Non Fiction",
    stock: false,
    favorite: false,

  },
];

export const cart = [
  {
    id: 1,
    BookName: "The Seven Husbands of Evelyn Hugo",
    Author: "Taylor Jenkins Reid",
    Price: 7.5,
    img: "../src/assets/Image/Product/Product1.jpg",
    quantity: 1,
    status: true
  },
  {
    id: 2,
    BookName: "The Night Circus",
    Author: "Erin Morgenstern",
    Price: 7.0,
    img: "../src/assets/Image/Product/Product2.jpg",
    quantity: 1,
    status: false
  },
  {
    id: 3,
    BookName: "The Silent Patient",
    Author: "Alex Michaelides",
    Price: 8.0,
    img: "../src/assets/Image/Product/Product6.jpg",
    quantity: 1,
    status: false
  }
]
export const order = [
  {
    id: 1,
    BookName: "The Seven Husbands of Evelyn Hugo",
    Author: "Taylor Jenkins Reid",
    Price: 7.5,
    img: "../src/assets/Image/Product/Product1.jpg",
    quantity: 1,
    order_date : "01/09/2026",
    process_status: "Delivered",
    status: true
  },
  {
    id: 2,
    BookName: "The Night Circus",
    Author: "Erin Morgenstern",
    Price: 7.0,
    img: "../src/assets/Image/Product/Product2.jpg",
    quantity: 1,
    order_date : "01/09/2026",
    process_status: "Packing",
    status: false
  },
  {
    id: 3,
    BookName: "The Silent Patient",
    Author: "Alex Michaelides",
    Price: 8.0,
    img: "../src/assets/Image/Product/Product6.jpg",
    quantity: 1,
    order_date : "01/09/2026",
    process_status: "Delivered",
    status: false
  }
]

export const address = [
  {
    id:1,
    Name: "G",
    Address: "123 Example 9 Taman Example",
    postcode:"12356",
    city:"taman",
    state: "example",
    country: "Malaysia",
    type:"Home",
    phone_number: "012-3456789",
    status:true
  },
   {
    id:2,
    Name: "G",
    Address: "123 Example 9 Taman Example",
    postcode:"12356",
    city:"taman",
    state: "example",
    country: "Malaysia",
    type:"Office",
    phone_number: "012-3456789",
    status:false
  }
 
]
