// @ts-nocheck
import * as fix from "./phone";
import visitorInfo from "visitor-info";
const IGNORE_DOMAINS = ["com", "org", "net", "co", "io"];

const makeLink = (phone) => {
  const { country } = visitorInfo();
  const { alpha2: countryFromTimeZone } = country || { alpha2: "az" };

  chrome.tabs.query(
    {
      active: true,
    },
    function (tabs) {
      const tab = tabs[0];
      const url = new URL(tab.url);
      const urlParts = url.hostname.split(".");
      const domain = urlParts[urlParts.length - 1];
      const foundCountryCode = IGNORE_DOMAINS.includes(domain)
        ? countryFromTimeZone
        : domain;

      const withPlus = phone[0] === "+";
      const [bestSuggestion] = withPlus ? fix.suggestion(phone) : [];
      const { formatted } = fix.check(phone, foundCountryCode.toLowerCase());

      chrome.tabs.create({
        url: `https://web.whatsapp.com/send?phone=${
          bestSuggestion ? bestSuggestion.formatted : formatted
        }`,
      });
    }
  );
};

function sendMessage(info) {
  if (!info || (info && !info.selectionText)) return;
  makeLink(info.selectionText.trim());
}

chrome.commands.onCommand.addListener(function (command) {
  if (command === "hotkey-whatsapp") {
    chrome.tabs.executeScript(
      {
        code: "window.getSelection().toString();",
      },
      function (text) {
        const selectionText = Array.isArray(text) ? text[0] : text;
        sendMessage({ selectionText });
      }
    );
  }
});

chrome.contextMenus.removeAll();

chrome.contextMenus.create({
  title: "WhatsApp Message",
  contexts: ["selection"],
  onclick: sendMessage,
});

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.create({
    url: "https://web.whatsapp.com/",
  });
});
