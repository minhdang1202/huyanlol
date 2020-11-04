// Base Api
export const BASE_API = "https://fordevv2.gatbook.org";

export const HEADER_DEFAULT = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const HEADER_FORM = {
  "Content-Type": "multipart/form-data",
};

export const TIMEOUT = 15000;

//Fixed value

// HTTP Status
export const STT_OK = 200;
export const STT_UNAUTHORIZED = 401;
export const STT_FORBIDDEN = 403;
export const STT_INTERNAL_SERVER = 500;

// Api
//Auth
export const POST_LOGIN = "/api/v1/user/login_by_email";
export const POST_LOGIN_BY_SOCIAL = "/api/v1/user/login_by_social";
export const POST_REGISTER = "/api/v1/user/register_by_email";
