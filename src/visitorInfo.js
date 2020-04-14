import callingCountries from "country-data/data/countries.json";
import momentTz from "moment-timezone/builds/moment-timezone-with-data-2012-2022.min";
import { ZONES } from './constants';

let timezone, countryCode, country; // eslint-disable-line prefer-const

const getTimezone = () => timezone || momentTz.tz.guess();

const getCountryCode = () =>
  countryCode || (ZONES[timezone] && ZONES[timezone].countries[0]);

const getCountry = () =>
  country ||
  callingCountries.find((item) => item.alpha2 === getCountryCode());

timezone = getTimezone();
countryCode = getCountryCode();
country = getCountry();

const visitorInfo = () => {
  return {
    timezone: getTimezone(),
    country: getCountry(),
  };
};

export default visitorInfo;
