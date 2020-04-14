import { WHATSAPP_WEB_URI_APP, WHATSAPP_WEB_URL } from "./constants";
import { protocolCheck } from "./checkProtocol";

const runtime = chrome.runtime;
let processing, isSupportWPApp;

chrome.extension.onMessage.addListener(function (message) {
  if (message && message.formattedPhone && !processing) {
    const urlWeb = `${WHATSAPP_WEB_URL}/send?phone=${message.formattedPhone}`;
    const uriApp = `${WHATSAPP_WEB_URI_APP}send?phone=${message.formattedPhone}`;
    processing = true;

    if (isSupportWPApp) {
      processing = false;
      window.location.href = uriApp;
      return;
    }

    protocolCheck(
      uriApp,
      function () {
        window.open(urlWeb);
      },
      function () {
        isSupportWPApp = true;
      }
    );
    setTimeout(() => (processing = false), 200);
  }
});

document.addEventListener(
  "click",
  (e) => {
    if (
      e.target &&
      e.target.tagName === "A" &&
      e.target.href &&
      e.target.href.includes("tel:")
    ) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.target.onclick = (e) => e.preventDefault();
      const phone = e.target.href.substr(4);
      runtime.sendMessage({ phone });
      return false;
    }
  },
  true
);