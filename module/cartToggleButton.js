import { makeDOMwithProperties } from "../utils/dom.js";
import { CART_COOKIE_KEY } from "../constants/cart.js";


export const getCartInfo = () => JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];

const isInCart = ({ id }) => {
  // 현재 해당 상품이 장바구니 안에 있는지를 판단하여 결과를 반환
  const originalCartInfo = getCartInfo();  //getItem이 string이라 JSON.parse로 객체로만듬
  // Array.find
  return !!originalCartInfo.find((cartInfo) => cartInfo.id === id);

};

const addCartInfo = (productInfo) => {

  // 장바구니에 해당 물품의 정보를 저장
  const originalCartInfo = getCartInfo();  //getItem이 string이라 JSON.parse로 객체로만듬

  //동일물건 저장X 기능
  if (originalCartInfo.findIndex((cartInfo) => cartInfo.id === productInfo.id) !== -1) return;

  localStorage.setItem(CART_COOKIE_KEY, JSON.stringify([
    ...originalCartInfo,     // ... spred문법
    productInfo,
  ]));
};


const removeCartInfo = ({ id }) => {
  //장바구니에서 해당 물품의 정보를 삭제
  const originalCartInfo = getCartInfo();

  // const newCartInfo = originalCartInfo.filter((cartInfo) => {
  //   return cartInfo.id !== id;   // {return } -> 축약해서 ()만으로 사용가능.
  // })    

  // Arrray.filter
  const newCartInfo = originalCartInfo.filter((cartInfo) => cartInfo.id !== id);

  localStorage.setItem(CART_COOKIE_KEY, JSON.stringify(newCartInfo));
};

export const getCartToggleButton = (productInfo, removeCartCallback) => {
  let inCart = isInCart(productInfo);
  const cartToggleBtn = makeDOMwithProperties('button', {
    className: 'cart-toggle-btn',
    type: 'button',
    onclick: () => {
      if (inCart) {  //이미ㅣ 장바구니에 들어가 있으면
        if (!confirm(`[${productInfo.name}]을 장바구니에서 삭제할까요?`)) return; //early-rturn

        removeCartInfo(productInfo);
        cartImage.src = './public/assets/cart.png';
        removeCartCallback?.();
      } else {  // 장바구니에 x -> 장바구니에 넣기
        addCartInfo(productInfo);
        cartImage.src = './public/assets/cartDisabled.png';
        if (confirm(`[${productInfo.name}]장바구니에 담았습니다. 장바구니 페이지로 이동할까요?`)) {
          location.href = './cart.html';
        }
      }
      inCart = !inCart;
    }
  });
  const cartImage = makeDOMwithProperties('img', {
    className: 'cart-image',
    src: inCart ? './public/assets/cartDisabled.png' : './public/assets/cart.png',
  });
  cartToggleBtn.appendChild(cartImage);

  return cartToggleBtn;
};