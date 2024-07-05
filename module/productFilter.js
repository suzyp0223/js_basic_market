import { makeDOMwithProperties } from "../utils/dom.js";
import { getProductList } from "./productList.js";

const MAX_PRICE = Number.MAX_VALUE;

const minPriceFilter = document.getElementById('price-min-filter');
const maxPriceFilter = document.getElementById('price-max-filter');
const discountFilter = document.getElementById('discount-filter');
const filterButton = document.getElementsByClassName('product-filter-con')[0]?.lastElementChild;

// 필터 버튼 누름 -> min, max, discount 값을 받아옴 -> 값을 이용하여 해당하는 물품을 추출 -> 다시 화면에 나타냄

export const setButtonEvent = (productList) => {
  filterButton.onclick = () => {
    const maxPrice = maxPriceFilter.value || MAX_PRICE;
    const minPrice = minPriceFilter.value || 0;
    const discountRate = discountFilter.value || 0;
    
    const newProductList = productList.filter((productInfo) => {
      const { price, discountPercent } = productInfo;
      return price >= minPrice && price <= maxPrice && discountRate <= discountPercent;
    });

    const sectionDOM = document.getElementsByTagName('section')[0];
    const originalProductListDOM = document.getElementsByClassName('product-list-con')[0];
    sectionDOM.removeChild(originalProductListDOM);
    if (newProductList.length > 0) {
      // 화면에 표시될 물품이 있음 
      
      const productListDOM = getProductList(newProductList);
      sectionDOM.appendChild(productListDOM);
    } else {
      const emptyProductListDOM = makeDOMwithProperties('div', {
        className: 'product-list-con empty',
        innerHTML: '조건에 해당하는 상품이 없습니다.'
      });
      sectionDOM.appendChild(emptyProductListDOM);
    }
      
  };
};
