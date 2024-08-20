export enum RoutesPath {
  AUTH = "auth",
  ADMINS = "",
  ALL = "all",
  ACTIVE = "active",
  PAUSED = "paused",
  CREATE = "create-qr",
  EIDT = "edit-qr",
  ID = ":id",
  QR = "qr",
}

export enum RoutesTitle {
  ADMINS = "Admins",
  ALL = "All",
  ACTIVE = "Active",
  PAUSED = "Paused",
}

export enum LocalStorageKeys {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export enum HTTP_HEADERS_KEYS {
  AUTHORIZATION = "Authorization",
  X_REFRESH_TOKEN = "x-refresh-token",
  X_ACCESS_TOKEN = "x-access-token"
}

export enum REDUX_TOOLKIT_TAGS {
  QR = "QR",
  ADMINS = "ADMINS",
  CURRENT_UER = "CURRENT_USER",
}

export enum API_ENDPOINTS {
  LOGIN = "/auth/sign-in",
  GET_ME = "/auth/me",
  ADMINS = "/admins",
  QR = "/qr"
}

export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE"
}

export enum TOAST_SEVERITY {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export enum BUTTON_VARIANT {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  SUCCESS = "success"
}

export enum BUTTON_SIZE {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg"
}

export enum BUTTON_TYPE {
  SUBMIT = "submit",
  BUTTON = "button",
  RESET = "reset",
}

export enum QRType {
  WEBSITE = "WEBSITE",
  V_CARD = "V_CARD",
  PDF = "PDF",
  IMAGE = "IMAGE"
}