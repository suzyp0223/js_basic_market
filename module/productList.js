import { makeDOMwithProperties } from "../utils/dom.js";
import { getProductCard } from "./productCard.js";

export const getProductList = (productInfoList, removeCartCallback) => {
  if (productInfoList == null || !Array.isArray(productInfoList)) return;
  
  const productlistContainer = makeDOMwithProperties('div', {
    className: 'product-list-con',
  });

  productInfoList.forEach((productInfo) => {
    productlistContainer.appendChild(
      getProductCard({
        ...productInfo, // spred 문법 - 객체 프로퍼티 하나씩 가져와서 객체형태로 뿌려준다.
      }, removeCartCallback)
    );
  })

  return productlistContainer;
};

{ /* <div class="product-list-con">
<div class="product-card"> */ }

//   productInfoList.forEach((productInfo) => { //productInfoList로 들어온 어레이를 forEach문으로 순회하여
//     const { id, imgSrc, name, discountPercent, price, originalPrice } = productInfo; //productInfo에서 하나씩 받아서
//     productlistContainer.appendChild(
//       getProductCard({
//         id,      // getProductCard에 받아온 요소들을
//         imgSrc,  // appendChild로 하나씩 할당한다.
//         name,
//         discountPercent,
//         price,
//         originalPrice,
//       })
//     );
//   })
// };


