import callingCountries from "country-data/data/countries.json";
import momentTz from "moment-timezone/builds/moment-timezone-with-data-2012-2022.min";
import { DEFAULT_COUNTRY } from './constants';
import { ZONES } from './zones';

export const visitorInfo = () => {
  const timezone = momentTz.tz.guess();
  const countryCode = (ZONES[timezone] && ZONES[timezone].countries[0]);
  const country = (callingCountries.find((item) => item.alpha2 === countryCode) || DEFAULT_COUNTRY);

  return {
    timezone,
    countryCode,
  };
};

