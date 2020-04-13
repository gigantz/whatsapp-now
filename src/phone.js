import countryCodes from "./countryCodes.json";
import { PhoneNumberFormat } from "google-libphonenumber";
import { PhoneNumberUtil } from "google-libphonenumber";
const phoneUtil = PhoneNumberUtil.getInstance();

export const check = (number, countryCode) => {
  try {
    var phoneNumber = phoneUtil.parse(number.split("+").join(""), countryCode);
    var output = {
      formatted: phoneUtil
        .format(phoneNumber, PhoneNumberFormat.INTERNATIONAL)
        .replace(/ /g, ""),
      isValid: phoneUtil.isValidNumber(phoneNumber),
      success: true,
      code: countryCode,
    };
    return output;
  } catch (e) {
    return { formatted: "", isValid: "", success: false, code: "" };
  }
};

export const suggestion = (number) => {
  var suggestions = [];
  countryCodes.forEach((country) => {
    try {
      var output = check(number, country.code);
      if (output.isValid) {
        suggestions.push(output);
      }
    } catch (e) {}
  });
  return suggestions;
};
