// function makeLink(phone, isAzerbaijani) {
//   const plus = phone.trim()[0] === "+" ? "+" : "";
//   let phoneNumber = phone.trim().replace(/\D/g, "");
//   const AZERBAIJANI_PHONES = /((|\()(|0)(50|51|55|70|77)+[0-9 )-.,]+)/gim;
  
//   if (AZERBAIJANI_PHONES.test(phoneNumber)) {
//     phoneNumber = (plus ? "+994" : "+994") + phoneNumber.substr(phoneNumber[0] === "0" ? 1 : 0);
//   }
  
//   return "https://web.whatsapp.com/send?phone=" + plus + phoneNumber;
// }

// function wrapPhoneNumbers(elementHtml) {
//   const imageSrc = chrome.runtime.getURL(
//     "images/icons/favicon-16x16-dunplab-manifest-713.png"
//   );
//   const PHONE_REGEX = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})/gim;
//   const AZERBAIJANI_PHONES = /((|\()(|0)(50|51|55|70|77)+[0-9 )-.,]+)/gim;

//   function wrapText(phone) {
//     return `<span style="white-space:nowrap;">
//               ${phone} 
//               <img onClick="window.open('${makeLink(
//                 phone
//               )}');" style="cursor:pointer;width:14px!important;height:14px!important;margin-right:0!important;padding-bottom:0!important;" src="${imageSrc}" width="14px" height="14px" alt="wp-icon" />
//             </span>`;
//   }

//   if (PHONE_REGEX.test(elementHtml)) {
//     return elementHtml.replace(PHONE_REGEX, wrapText);
//   } else if (AZERBAIJANI_PHONES.test(elementHtml)) {
//     return elementHtml.replace(AZERBAIJANI_PHONES, wrapText);
//   }

//   return elementHtml;
// }

// function bootstrap() {
//   document.body.querySelectorAll("span, a, li").forEach(function (el) {
//     if (el && el.tagName === "A" && el.href && el.href.includes("tel:")) {
//       el.removeAttribute("href");
//       el.innerHTML = wrapPhoneNumbers(
//         el.innerHTML.replace(/(href=")([a-zA-Z0-9:;\.\s\(\)\-\,]*)(")/gi, "")
//       );
//     } else {
//       if (el && el.tagName === "P") {
//         const phoneLinks = []; 
//         el.querySelectorAll("a").forEach((pEl) => {
//           const PHONE_REGEX = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})/gim;
//           const AZERBAIJANI_PHONES = /^(|0)(50|51|55|70|77)+[0-9 ]+$/gim;
//           if (
//             PHONE_REGEX.test(pEl.innerHTML) ||
//             AZERBAIJANI_PHONES.test(pEl.innerHTML)
//           ) {
//             phoneLinks.push(1);
//           }
//         });
//         if (phoneLinks.length > 0) {
//           return;
//         }
//       }
//       el.innerHTML = wrapPhoneNumbers(el.innerHTML);
//     }
//   });
// }

// document.addEventListener("beforeunload", bootstrap);
// bootstrap();













// function makeLink(phone, isAzerbaijani) {
//   const plus = phone.trim()[0] === "+" ? "+" : "";
//   let phoneNumber = phone.trim().replace(/\D/g, "");
//   const AZERBAIJANI_PHONES = /((|0)(50|51|55|70|77)+[0-9 ]+)/gim;

//   if (AZERBAIJANI_PHONES.test(phoneNumber) && isAzerbaijani) {
//     phoneNumber = "+994" + phoneNumber.substr(phoneNumber[0] === "0" ? 1 : 0);
//   }
//   return "https://web.whatsapp.com/send?phone=" + plus + phoneNumber;
// }

// function wrapPhoneNumbers(el) {
//   const PHONE_REGEX = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})/gim;
//   const AZERBAIJANI_PHONES = /^(|0)(50|51|55|70|77)+[0-9 ]+$/gim;

//   const imageSrc = chrome.runtime.getURL(
//     "images/icons/favicon-16x16-dunplab-manifest-713.png"
//   );
//   const img = new Image();
//   img.src = imageSrc;
//   img.alt = 'whatsapp-now';
//   img.width = 14;
//   img.height = 14;
//   img.setAttribute("style", "cursor:pointer;width:14px!important;height:14px!important;");

//   if (PHONE_REGEX.test(el.innerText)) {
//     const wpUrl = makeLink(el.innerText);
//     img.onclick = function() {
//       window.open(wpUrl);
//     }
//     el.appendChild(img);
//   } else if (AZERBAIJANI_PHONES.test(el.innerText)) {
//     const wpUrl = makeLink(el.innerText, true);
//     img.onclick = function() {
//       window.open(wpUrl);
//     }
//     el.appendChild(img);
//   }
// }

// function bootstrap() {
//   document.body.querySelectorAll("span, a, p, li").forEach(function (el) {
//     wrapPhoneNumbers(el)
//   });
// }

// document.addEventListener("beforeunload", bootstrap);
// bootstrap();




// "content_scripts": [{
//   "matches": ["<all_urls>"],
//   "all_frames": true,
//   "js": ["content.js"],
//   "run_at": "document_end"
// }],