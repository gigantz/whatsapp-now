import {
  PhoneNumberFormat,
  PhoneNumberUtil,
} from "google-libphonenumber";
const phoneUtil = PhoneNumberUtil.getInstance();

export const checkPhoneNumber = (phoneNumber, countryCode) => {
  try {
    const withPlus = !phoneNumber.indexOf('+');
    try {
      const parsedPhoneNumber = phoneUtil.parse(
        phoneNumber,
        withPlus ? "" : countryCode.toUpperCase()
      );

      const output = {
        formatted: phoneUtil.format(parsedPhoneNumber, PhoneNumberFormat.E164),
        isValid: phoneUtil.isValidNumber(parsedPhoneNumber),
        success: true,
        code: countryCode,
      };

      return output;
    } catch (error) {
      console.log({ error });
    }
  } catch (e) {
    return { formatted: number, isValid: "", success: false, code: "" };
  }
};
