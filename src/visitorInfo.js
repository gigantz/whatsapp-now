import momentTz from "moment-timezone/builds/moment-timezone-with-data-2012-2022.min";
import { DEFAULT_COUNTRY } from './constants';
import { ZONES } from './zones';

export const visitorInfo = () => {
  const timezone = momentTz.tz.guess();
  const countryCode = (ZONES[timezone] && ZONES[timezone].countries[0]) || DEFAULT_COUNTRY;
  return {
    timezone,
    countryCode,
  };
};

