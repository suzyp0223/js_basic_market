import { CART_COOKIE_KEY } from "./constants/cart.js";
import { getCartInfo } from "./module/cartToggleButton.js";
import { getProductList } from "./module/productList.js";
import { makeDOMwithProperties } from "./utils/dom.js";
import { setPayInfo } from "./module/payModule.js"
// 부모 -> section tag
// 뒤에 있는 요소 -> id: cart-pay-container
// 장바구니 내부에 있는 물품 -> product-list-con

// 1. 장바구니에 있는 물품 정보 가져오기
// 2. 물품 정보 - productList와 연결
// 3. section 아래의 cart-pay-container 앞에 삽입하기

const sectionDOM = document.getElementsByTagName('section')[0];
const cartPayContainerDOM = document.getElementById('cart-pay-container');

const cartInfo = getCartInfo();

const reloadPage = () => location.reload();

if (cartInfo.length < 1) {
  //장바구니에 상품이 없다는 언지 
  const noticeDOM = makeDOMwithProperties('div', {
    innerHTML: '장바구니에 상품이 없습니다.',
    className: 'product-list-con',
  });
  sectionDOM.insertBefore(noticeDOM, cartPayContainerDOM);
} else {
  const productListDOM = getProductList(cartInfo, reloadPage);
  sectionDOM.insertBefore(productListDOM, cartPayContainerDOM);

  // A.insertBefore(B, C);
  // B가 A 아래의 C 앞에 삽입되는 메서드
}

const cartAllDeleteButtonDOM = document.getElementById('remove-all-button');
cartAllDeleteButtonDOM.onclick = () => {
  //localstorage에 있는 장바구니 물품 목록 정보 전부 삭제
  localStorage.removeItem(CART_COOKIE_KEY);  //cartInfo라는 키를 가진 키-값 쌍이 삭제
  // localStorage.clear();  //localStorage의 모든 키-값 쌍이 삭제 
  
  //페이지에 반영
  location.reload(); //새로고침
};

setPayInfo();
