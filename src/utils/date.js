import "date-fns";
import { AppConstant, LangConstant } from "../const";
import viLocale from "date-fns/locale/vi";
import enLocale from "date-fns/locale/en-US";
import {
  format,
  differenceInCalendarDays,
  formatDistance,
  isSameYear,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  compareAsc,
  parseISO,
} from "date-fns";
import StringFormat from "string-format";
import { getLabel } from "language";

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
  const displayDate = isSameDay ? displayDateInSameDay : convertFormat(date, AppConstant.FM_DD_MM_YYYY);
  return displayDate;
};

export const getCreatedTime = created => {
  let result = "";
  if (created) {
    let currentDate = new Date();
    let differenceDaysWithCurrent = differenceInDays(currentDate, created);
    let differenceHoursWithCurrent = differenceInHours(currentDate, created);
    let differenceMinutesWithCurrent = differenceInMinutes(currentDate, created);
    if (differenceDaysWithCurrent >= 1) {
      if (differenceDaysWithCurrent >= 7) {
        let isSame = isSameYear(created, currentDate);
        let primaryFormat = isSame ? AppConstant.FM_DD_MM : AppConstant.FM_DD_MM_YYYY;
        result = format(created, primaryFormat);
      } else {
        result = StringFormat(getLabel("FM_NEW_CREATED_BY_DAY"), differenceDaysWithCurrent);
      }
    } else if (differenceHoursWithCurrent >= 1) {
      result = StringFormat(getLabel("FM_NEW_CREATED_BY_HOUR"), differenceHoursWithCurrent);
    } else if (differenceMinutesWithCurrent >= 1) {
      result = StringFormat(getLabel("FM_NEW_CREATED_BY_MINUTE"), differenceMinutesWithCurrent);
    } else if (differenceMinutesWithCurrent >= 0) {
      result = getLabel("TXT_NEW_CREATED_BY_SECOND");
    }
  }
  return result;
};

export const pastDueDate = dueDate => {
  return Boolean(compareAsc(new Date(parseISO(dueDate)), new Date()) <= 0);
};

export const daysLeft = dueDate => {
  return differenceInCalendarDays(new Date(parseISO(dueDate)), new Date());
};
