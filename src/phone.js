import {
  PhoneNumberFormat,
  PhoneNumberUtil,
  PhoneNumber,
} from "google-libphonenumber";
const phoneUtil = PhoneNumberUtil.getInstance();

export const check = (number, countryCode) => {
  try {
    const phoneRaw = phoneUtil.parseAndKeepRawInput(number);
    const withPlus =
      phoneRaw.countryCodeSourceCount() ===
      PhoneNumber.CountryCodeSource.FROM_NUMBER_WITH_PLUS_SIGN;

    try {
      const phoneNumber = phoneUtil.parse(
        number,
        (!withPlus && countryCode) || ""
      );

      const output = {
        formatted: phoneUtil.format(phoneNumber, PhoneNumberFormat.E164),
        isValid: phoneUtil.isValidNumber(phoneNumber),
        success: true,
        code: countryCode,
      };
      return output;
    } catch (error) {
      console.log({ error });
    }
  } catch (e) {
    return { formatted: "", isValid: "", success: false, code: "" };
  }
};
