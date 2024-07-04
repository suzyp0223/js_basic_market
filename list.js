import { getProductCard } from './module/productCard.js';

const sectionDOM = document.getElementsByTagName('section')[0];
const productCard = getProductCard({
  "id": 2,
  "imgSrc": "./public/assets/당근.jpg",
  "name": "친환경 당근 400g",
  "discountPercent": 33,
  "price": 2000,
  "originalPrice": 3000
});

const productCard2 = getProductCard({
  "id": 4,
  "imgSrc": "./public/assets/삼겹살.jpg",
  "name": "구이용 삼겹살 600g (냉장)",
  "discountPercent": 5,
  "price": 14820,
  "originalPrice": 15600
});




sectionDOM.appendChild(productCard);
sectionDOM.appendChild(productCard2);
