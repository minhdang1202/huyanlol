import { ApiConstant, AppConstant } from "const";
import StringFormat from "string-format";

export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .replace(/-/g, "");
};

export const validateEmail = content => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  return content && regex.test(String(content).replace(/\s+/g, "").toLowerCase());
};

export const validatePhone = content => {
  const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/;
  const isValid = content && content.length > 8 && content.length <= 16;
  return isValid && regex.test(String(content).replace(/\s+/g, "").toLowerCase());
};

export const validatePassword = content => {
  return content && content.length >= 8;
};

export const validateFileSize = (fileSize, limit = 1) => {
  let limitSizeMb = limit * 1024 * 1024;
  return fileSize <= limitSizeMb;
};

export const convertSmallNumber = number => {
  if (Number.isInteger(number)) {
    return number < 10 ? "0" + number : number;
  }
  return number;
};

export const isNumber = str => str && str.match(/^[0-9]+$/) != null;

export const isBlank = str => !str || /^\s*$/.test(str);

export const isString = string => string && typeof string === "string";

export const onGoBack = () => window.history.back();

export const cutString = (maxLength, content) => {
  const trimmedContent = content.substring(0, maxLength);

  const cutContent =
    content.length < maxLength
      ? content
      : `${trimmedContent.substring(0, Math.min(trimmedContent.length, trimmedContent.lastIndexOf(" ")))}...`;

  return cutContent;
};

export const getAppDownloadLink = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // iOS detection
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return AppConstant.GAT_APP_STORE;
  }

  return AppConstant.GAT_GG_PLAY;
};

export const getNumberIdFromQuery = query => {
  const id = query.slice(query.lastIndexOf("-b") + 2);
  return id;
};

export const getNumberIdFromCreateQuery = query => {
  const id = query.slice(query.lastIndexOf("-") + 1);
  return id;
};

export const getTitleNoMark = title => {
  if (title) {
    title = title.toLowerCase();
    title = title.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    title = title.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    title = title.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    title = title.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    title = title.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    title = title.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    title = title.replace(/đ/g, "d");
    title = title.replace(/[^a-zA-Z0-9]/g, "_");
    const regex = /\s/gi;
    const titleNoMark = title.replace(regex, "-");
    return titleNoMark;
  }
  return title;
};

export const getCurrentPosition = () => {
  let latitude = 21.03;
  let longitude = 105.84;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    });
  }

  return { latitude, longitude };
};

export const convertUnitToKm = distance => {
  distance = `${(distance / 1000).toFixed(1)} km`;
  return distance;
};

export const getImageById = imageId => {
  if (!imageId) imageId = AppConstant.IMAGE_PLACEHOLDER_ID;
  return StringFormat(ApiConstant.BASE_IMAGE_API, imageId);
};

export const getRandomDefaultArticleCoverId = () => {
  const coverIdList = [
    50663879767,
    50663884897,
    50663081883,
    50663824301,
    50663900562,
    50663077308,
    50663896287,
    50663817706,
    50663816156,
  ];
  const randomNumber = Math.floor(Math.random() * 9);
  return coverIdList[randomNumber];
};

export const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = error => reject(error);
  });

export const checkIfLastPage = ({ pageSize, pageNo, total }) => {
  return Math.ceil(total / pageSize) === pageNo;
};

export const getRedirectPath = (path, id, title) => {
  const titleNoMark = title ? getTitleNoMark(title) : null;
  return titleNoMark ? StringFormat(path, titleNoMark, id) : StringFormat(path, "_", id);
};

export const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const scrollToCenterEl = id => {
  document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "center" });
};

export const scrollToTop = id => {
  const element = document.getElementById(id);
  element.scrollTop = 0;
};

export const getAbsolutePath = path => {
  return AppConstant.WEBSITE_URL + path;
};
