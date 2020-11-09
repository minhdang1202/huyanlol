import "date-fns";
import { LangConstant } from "../const";
import viLocale from "date-fns/locale/vi";
import enLocale from "date-fns/locale/en-US";
import { format, differenceInCalendarDays, formatDistance, getDate } from "date-fns";

export const getDateLang = lang => {
  if (LangConstant.EN_LANG == lang) {
    return enLocale;
  }
  return viLocale;
};

export const createDate = timestamp => {
  let date = new Date(timestamp * 1000);
  return date;
};

export const convertFormat = (date, strFormat, options = {}) => {
  try {
    return format(date, strFormat, options);
  } catch (error) {
    console.log(error);
  }
  return "";
};

export const getTimestamp = date => {
  let tmpDate = new Date(date);
  return Math.round(tmpDate.getTime() / 1000);
};

export const convertDistanceDate = (date, baseDate, lang) => {
  const isSameDay = differenceInCalendarDays(date, baseDate) == 0;
  const displayDateInSameDay = formatDistance(date, baseDate, {
    includeSeconds: true,
    locale: getDateLang(lang),
  });
  const displayDate = isSameDay ? displayDateInSameDay : convertFormat(baseDate, "dd/MM/yyyy");
  return displayDate;
};
