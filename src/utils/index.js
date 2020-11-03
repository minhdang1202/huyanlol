import { AppConstant } from "const";
import axios from "axios";

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

export const cutString = (limitContent, content) => {
  const trimmedContent = content.substring(0, limitContent);

  const cutContent =
    content.length < limitContent
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

export const getTitleNoMark = title => {
  title = title.toLowerCase();
  title = title.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  title = title.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  title = title.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  title = title.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  title = title.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  title = title.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  title = title.replace(/đ/g, "d");
  const regex = /\s/gi;
  const titleNoMark = title.replace(regex, "-");
  return titleNoMark;
};

export const getImageBase64 = async imageId => {
  let image = await axios.get(`https://fordev.gatbook.org/rest/api/common/get_image/${imageId}`, {
    responseType: "arraybuffer",
  });
  image = Buffer.from(image.data, "binary").toString("base64");
  return image;
};
