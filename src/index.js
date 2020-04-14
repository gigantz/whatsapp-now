import { checkPhoneNumber } from './phone';
import { visitorInfo } from './visitorInfo';
import { IGNORE_DOMAINS_EXT } from './constants';

function generateWhatsAppURL(phone) {
  const { countryCode: countryFromTimeZone } = visitorInfo();

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      const [activeTab] = tabs;
      const url = new URL(activeTab.url);
      const urlParts = url.hostname.split('.');
      const domainExt = urlParts[urlParts.length - 1];
      const foundCountryCode = IGNORE_DOMAINS_EXT.includes(domainExt)
        ? countryFromTimeZone
        : domainExt;
      const { formatted } = checkPhoneNumber(
        phone,
        foundCountryCode.toLowerCase()
      );

      chrome.tabs.sendMessage(activeTab.id, { formattedPhone: formatted });
    }
  );
}

function selectedText(info) {
  if (!(info || {}).selectionText) return;
  generateWhatsAppURL(info.selectionText.trim());
}

chrome.runtime.onMessage.addListener(function (request) {
  if (request.phone) generateWhatsAppURL(request.phone.trim());
});

chrome.commands.onCommand.addListener(function (command) {
  if (command === 'hotkey-whatsapp') {
    chrome.tabs.executeScript(
      {
        code: 'window.getSelection().toString();',
      },
      (text) => {
        const selectionText = Array.isArray(text) ? text[0] : text;
        generateWhatsAppURL(selectionText);
      }
    );
  }
});

chrome.contextMenus.create({
  title: 'WhatsApp Message',
  contexts: ['selection'],
  onclick: selectedText,
});
