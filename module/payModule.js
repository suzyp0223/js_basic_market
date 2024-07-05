import { getCartInfo } from "./cartToggleButton.js";

const DELIVERY_FREE_PRICE = 20000;
const DELIVERY_PRICE = 3000;

const originalPriceDOM = document.getElementById('original-price');
const discountPriceDOM = document.getElementById('discount-price');
const deliveryPriceDOM = document.getElementById('delivery-price');
const totalPriceDOM = document.getElementById('total-price');

// "id": 1,
//   "imgSrc": "./public/assets/파프리카.jpg",
//     "name": "파프리카 2입",
//       "discountPercent": 20,
//         "price": 2000,
//           "originalPrice": 2500

export const setPayInfo = () => {
  // 1. 장바구니에서 물품 정보 얻어오기
  // 2. 물품 정보들을 순회하면서 총 가격, 할인된 가격, 배송비, 결제 금액을 계산하기
  // 3. 2번에서 계산된 금액들을 DOM.innerHTML로 할당하기

  const cartInfoList = getCartInfo();

  let deliveryPrice = 0;  // 20,000원 미만 구매 -> 3,000원  / 이상 구매 배송비 0원
  let totalPrice = 0;


  //배열을 reduce() 매서드로 하나씩 더함.
  const { originalPrice, discountPrice } = cartInfoList.reduce((prev, curr) => ({
    originalPrice: prev.originalPrice + curr.originalPrice,
    discountPrice: prev.discountPrice + (curr.originalPrice - curr.price),
  }), {
    originalPrice: 0,
    discountPrice: 0,
  });

  // 배열에서 forEach로 하나씩 꺼내서 더함.
  // cartInfoList.forEach((cartInfo) => {
  //   originalPrice += cartInfo.originalPrice;  //복합할당연산자  X += 3; X = X + 3;
  //   discountPrice += (cartInfo.originalPrice - cartInfo.price);
  // });


  const payPrice = originalPrice - discountPrice;
  if (payPrice >= DELIVERY_FREE_PRICE) {
    deliveryPrice = 0;
  } else {
    deliveryPrice = DELIVERY_PRICE;
  }

  totalPrice = payPrice + deliveryPrice;

  originalPriceDOM.innerHTML = `${originalPrice.toLocaleString()}원`;
  discountPriceDOM.innerHTML = discountPrice ? `-${discountPrice.toLocaleString()}원` : '0원';
  deliveryPriceDOM.innerHTML = deliveryPrice ? `+${deliveryPrice.toLocaleString()}원` : '0원';
  totalPriceDOM.innerHTML = `${totalPrice.toLocaleString()}원`;
  // 할인된 가격 -> 원래 가격(originalPrice) - 판매 가격(price)


};
